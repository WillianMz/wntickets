import { TipoEquipamentoResponse } from './../../../models/equipment/tipoEquipamentoResponse.model';
import { SetorResponse } from './../../../models/sector/setorResponse.model';
import { EquipamentoResponse } from './../../../models/equipment/equipamentoResponse.model';
import { SetorModel } from 'src/app/models/sector/setorModel';
import { SectorService } from 'src/app/services/sector.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ErroServidor } from 'src/app/models/erroServidor';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { EquipamentoModel } from 'src/app/models/equipment/equipamentoModel';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-equip-list',
  templateUrl: './equip-list.component.html',
  styleUrls: ['./equip-list.component.css']
})
export class EquipListComponent implements OnInit {

  public filtros = [
    { id: 1, descricao: 'Todos' },
    { id: 2, descricao: 'Setor' },
    { id: 3, descricao: 'Tipo' },
    { id: 4, descricao: 'Marca' },
    { id: 5, descricao: 'Modelo' },
    { id: 6, descricao: 'Fabricante' },
    { id: 7, descricao: 'Serial' }
  ];

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;

  tituloDaPagina: string = 'Equipamentos';
  setores: SetorResponse[];
  tiposEquipamentos: TipoEquipamentoResponse[];
  descricao: string;
  sectorId: number;
  tipoId: number;
  equipments: EquipamentoResponse[];
  setor: SetorModel;
  equipment: EquipamentoModel;
  equipmentId: number;
  equipmentName: string;
  success: boolean;
  message: string;
  erros: ErroServidor[];
  public configuration: Config;
  public columns: Columns[];
  mensagem: string;

  constructor(
    private equipamentoService: EquipamentoService,
    private setorService: SectorService,
    private router: Router,
    private notification: NotificationService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.sectorId = parseInt(params.sector);
        this.tipoId = parseInt(params.tipo);
      }
    );

    this.configGrid();
    this.listarSetores();
    this.listarTipos();
    this.listar();
  }

  //OK
  private configGrid() {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.fixedColumnWidth = false;
    this.configuration.selectRow = true;
    this.configuration.rows = 10;
    this.configuration.tableLayout.style = 'tiny';
    //colunas
    this.columns = [
      { key: 'id', title: 'Cód.' },
      { key: 'codInterno', title: 'Cód.Interno' },
      { key: 'nome', title: 'Nome' },
      { key: 'marca', title:'Marca'},
      { key: 'modelo', title: 'Modelo' },
      { key: 'action', title: 'Opções', cellTemplate: this.actionTpl, searchEnabled:false }
    ];
  }

  public adicionar(){
    this.router.navigate(['equipment/new']);
  }

  public tiposDeEquipamentos(){
    this.router.navigate(['/equipment/tipo'])
  }

  public buscarPorNome(){
    if(this.descricao){
      this.procurarPorNome(this.descricao);
      this.notification.showInfo('Consulta OK');
    }
    else {
      this.listarEquipamentos(true);
    }
  }

  public listar(){
    //se setorId tiver valor filtrar por setor
    if(this.sectorId){
      this.procurarPorSetor(this.sectorId, true)
    } else if(this.tipoId){
      this.procurarPorTipo(this.tipoId, true);
    }
    else{
      this.listarEquipamentos(true);
    }
  }

  public limparFiltros(){

  }

  public editar(equipmentId: string){
    this.router.navigate([`equipment/edit/${equipmentId}`]);
  }

  public desativar(id: string){
    this.spinner.show();

    this.equipamentoService.desativar(Number.parseInt(id)).subscribe({
      next: (response) => {
        this.success = response['sucesso'];

        //RETORNO BACK -> REGRAS DE NEGOCIO
        if(this.success == true){
          this.message = response['mensagem'];
          this.notification.showInfo(this.message);
          this.spinner.hide();
        }
        else{
          this.message = response['mensagem'];
          this.notification.showError(this.message);
          this.spinner.hide();
        }
      },
      error: (response) => {
        //PEGA OS ERROS. FALHAS
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
      }
    });
  }

  public ativar(id: string){
    this.spinner.show();

    this.equipamentoService.ativar(Number.parseInt(id)).subscribe({
      next: (response) => {
        this.success = response['sucesso'];

        //RETORNO BACK -> REGRAS DE NEGOCIO
        if(this.success == true){
          this.message = response['mensagem'];
          this.notification.showInfo(this.message);
          this.spinner.hide();
        }
        else{
          this.message = response['mensagem'];
          this.notification.showError(this.message);
          this.spinner.hide();
        }
      },
      error: (response) => {
        //PEGA OS ERROS. FALHAS
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
      }
    });
  }

  public excluir(id: string){
    this.equipamentoService.excluir(Number.parseInt(id)).subscribe({
      next: (response) => {
        this.success = response['sucesso'];

        //RETORNO BACK -> REGRAS DE NEGOCIO
        if(this.success == true){
          this.message = response['mensagem'];
          this.notification.showInfo(this.message);
          this.spinner.hide();
        }
        else{
          this.message = response['mensagem'];
          this.notification.showError(this.message);
          this.spinner.hide();
        }
      },
      error: (response) => {
        //PEGA OS ERROS. FALHAS
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
      }
    });
  }

  public detalhes(){
    //falta desenvolver. Somente no final
  }


  /*CONSULTAS **********************************************************/
  //OK
  private listarEquipamentos(ativo: boolean) {
    this.equipamentoService.getAll(ativo).subscribe({
      next: (response) => {
        this.equipments = response;
        this.tituloDaPagina = "Equipamentos";
        this.spinner.hide();
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError('Erro ao obter dados');
        this.spinner.hide();
      }
    });
  }
  //OK
  private procurarPorNome(nome:string){
    this.spinner.show();
    this.equipamentoService.getByNome(nome).subscribe({
      next: (response) => {
        this.equipments = response;
        this.spinner.hide();
        this.mensagem = 'Filtro por Nome';
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError('Erro ao obter dados');
        this.spinner.hide();
      }
    });
  }
  //OK
  private procurarPorTipo(tipoId: number, ativo: boolean){
    this.spinner.show();
    this.equipamentoService.getByTipo(tipoId, ativo).subscribe({
      next: (response) => {
        this.equipments = response;
        this.spinner.hide();
        this.mensagem = 'Filtro por Tipo de equipamento';
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError('Erro ao obter dados');
        this.spinner.hide();
      }
    });
  }
  //OK
  private procurarPorMarca(marca: string, ativo: boolean){
    this.spinner.show();
    this.equipamentoService.getByMarca(marca, ativo).subscribe({
      next: (response) => {
        this.equipments = response;
        this.spinner.hide();
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError('Erro ao obter dados');
        this.spinner.hide();
      }
    });
  }
  //OK
  private procurarPorModelo(modelo: string, ativo: boolean){
    this.spinner.show();
    this.equipamentoService.getByModelo(modelo, ativo).subscribe({
      next: (response) => {
        this.equipments = response;
        this.spinner.hide();
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError('Erro ao obter dados');
        this.spinner.hide();
      }
    });
  }
  //OK
  private procurarPorSetor(setorId: number, ativo: boolean){
    this.spinner.show();
    this.equipamentoService.getBySetor(setorId, ativo).subscribe({
      next: (response) => {
        this.equipments = response;
        this.spinner.hide();
        this.mensagem = 'Filtro por Setor';
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError('Erro ao obter dados');
        this.spinner.hide();
      }
    });
  }
  //OK
  private procurarPorFabricante(fabricante: string, ativo: boolean){
    this.spinner.show();
    this.equipamentoService.getByFabricante(fabricante, ativo).subscribe({
      next: (response) => {
        this.equipments = response;
        this.spinner.hide();
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError('Erro ao obter dados');
        this.spinner.hide();
      }
    });
  }
  //OK
  private procurarPorSerial(serial: string, ativo: boolean){
    this.spinner.show();
    this.equipamentoService.getBySerial(serial, ativo).subscribe({
      next: (response) => {
        this.equipments = response;
        this.spinner.hide();
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError('Erro ao obter dados');
        this.spinner.hide();
      }
    });
  }

  private listarSetores(){
    this.setorService.getAll1(true).subscribe({
      next: (response) => {
        this.setores = response;
      }
    });
  }

  private listarTipos(){
    this.equipamentoService.getTipos(true).subscribe({
      next: (response) => {
        this.tiposEquipamentos = response;
      }
    })
  }
  /*CONSULTAS **********************************************************/
}
