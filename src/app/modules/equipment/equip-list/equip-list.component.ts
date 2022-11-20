import { BaixarEquipamentoRequest } from './../../../models/equipment/baixarEquipamentoRequest.model';
import { FiltroEquipamento } from './filtroEquipamento';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoEquipamentoResponse } from './../../../models/equipment/tipoEquipamentoResponse.model';
import { SetorResponse } from './../../../models/sector/setorResponse.model';
import { EquipamentoResponse } from './../../../models/equipment/equipamentoResponse.model';
import { SectorService } from 'src/app/services/sector.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ErroServidor } from 'src/app/models/erroServidor';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { LoginService } from 'src/app/services/login.service';
import { VerificarPermissoes } from 'src/app/functions/verificarPermissoes';

@Component({
  selector: 'app-equip-list',
  templateUrl: './equip-list.component.html',
  styleUrls: ['./equip-list.component.css']
})
export class EquipListComponent implements OnInit {

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  display: boolean = false;
  tituloDaPagina: string = 'Equipamentos';
  setores: SetorResponse[];
  setor: SetorResponse;
  tipo: TipoEquipamentoResponse;
  tiposEquipamentos: TipoEquipamentoResponse[];
  equipments: EquipamentoResponse[];
  setorId: number;
  tipoId: number;
  verComboboxSetores: boolean = false;
  verComboboxTipos: boolean = false;
  filtroForm: FormGroup;
  baixaForm: FormGroup;
  nomeBotaoFiltro: string = 'Filtro';
  campo_pesquisa: boolean = true;
  verGrid: boolean = false;
  somenteAtivos: boolean = true;
  sectorId: number;
  success: boolean;
  message: string;
  erros: ErroServidor[];
  public configuration: Config;
  public columns: Columns[];

  constructor(
    private equipamentoService: EquipamentoService,
    private setorService: SectorService,
    private router: Router,
    private notification: NotificationService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private loginService: LoginService
  ) {
    const filtro = new FiltroEquipamento()
    this.validarFormulario(filtro);
    this.validarFormBaixa('');
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.sectorId = parseInt(params.sector);
        this.tipoId = parseInt(params.tipo);
        this.somenteAtivos = params.ativo;
      }
    );

    this.configGrid();
    this.listarSetores();
    this.listarTipos();
    if (this.sectorId) {
      this.filtrarPor(2);
      this.procurar();
    } else {
      this.consultarEquipamentos(true);
    }
  }

  public verificarPermissao(roleFuncionalidade: string[]): boolean{
    const usuarioLogado = this.loginService.usuarioLogado();
    const role = usuarioLogado?.perfil;
    return VerificarPermissoes.temPermissao(roleFuncionalidade, role!);
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
      { key:'setor.nome', title:'Laboratório'},
      { key: 'action', title: 'Opções', cellTemplate: this.actionTpl, searchEnabled:false }
    ];
  }

  get texto(){
    return this.filtroForm.get('texto')?.value;
  }

  get setorID() {
    return this.filtroForm.get('setor')?.value;
  }

  get tipoID(){
    return this.filtroForm.get('tipo')?.value;
  }

  get motivo(){
    return this.baixaForm.get('motivo')?.value;
  }

  public adicionar(){
    this.router.navigate(['equipment/new']);
  }

  public tiposDeEquipamentos(){
    this.router.navigate(['/equipment/tipo'])
  }

  public filtrarPor(filtro: number){
    switch(filtro) {
      case 1://TODOS ATIVOS
        this.verComboboxSetores = false;
        this.verComboboxTipos = false;
        this.nomeBotaoFiltro = 'Ativos';
        this.somenteAtivos = true;
        this.consultarEquipamentos(true);
        break;
      case 2://SETOR
        this.nomeBotaoFiltro = 'Filtrando por laboratório';
        this.verComboboxSetores = true;
        this.verComboboxTipos = false;
        this.campo_pesquisa = false;
        this.somenteAtivos = true;
        break;
      case 3://TIPO
        this.nomeBotaoFiltro = 'Filtrando por tipo';
        this.verComboboxSetores = false;
        this.verComboboxTipos = true;
        this.campo_pesquisa = false;
        this.somenteAtivos = true;
        break;
      case 4://DESATIVADOS
        this.nomeBotaoFiltro = 'Desativados';
        this.verComboboxSetores = false;
        this.verComboboxTipos = false;
        this.campo_pesquisa = false;
        this.somenteAtivos = false;
        this.tituloDaPagina = 'Equipamentos desativados';
        this.consultarEquipamentos(false);
        break;
      case 5://DESATIVADOS POR SETOR
        this.nomeBotaoFiltro = 'Desativados por laboratório';
        this.verComboboxSetores = true;
        this.verComboboxTipos = false;
        this.campo_pesquisa = false;
        this.somenteAtivos = false;
        break;
      case 6://DESATIVADOS POR TIPO
        this.nomeBotaoFiltro = 'Desativados por tipo';
        this.verComboboxSetores = false;
        this.verComboboxTipos = true;
        this.campo_pesquisa = false;
        this.somenteAtivos = false;
        break;
      default:
        this.nomeBotaoFiltro = 'Ativos';
        this.verComboboxSetores = false;
        this.verComboboxTipos = false;
        this.campo_pesquisa = true;
        this.somenteAtivos = true;
        break;
    }
  }

  public limparFiltros(){
    this.nomeBotaoFiltro = 'Padrão';
    this.verComboboxSetores = false;
    this.verComboboxTipos = false;
    this.campo_pesquisa = true;
    this.somenteAtivos = true;
    this.router.navigate(['equipment']);
    this.consultarEquipamentos(this.somenteAtivos);
  }

  public procurar(){
    if(this.setorID){
      this.consultarPorSetor(this.setorID, this.somenteAtivos);
      let teste = new FiltroEquipamento();
      teste.ativo = 0;
      teste.setor = this.setorID;
      this.validarFormulario(teste);
    }
    if(this.tipoID){
      this.consultarPorTipo(this.tipoID, this.somenteAtivos);
    }
    if(this.texto){
      this.consultarPorNome(this.texto);
    }
    if(this.sectorId){
      this.consultarPorSetor(this.sectorId, this.somenteAtivos);
      let teste = new FiltroEquipamento();
      teste.ativo = 0;
      teste.setor = this.sectorId;
      this.validarFormulario(teste);
    }
    if(this.tipoId){
      this.consultarPorTipo(this.tipoId, this.somenteAtivos);
    }
  }

  abrirChamado(equipamento: string) {
    this.router.navigate(['/ticket/open'], { queryParams: {equipamentoId: equipamento}});
  }

  public editar(equipmentId: string){
    this.router.navigate([`equipment/edit/${equipmentId}`]);
  }

  public abrirChamado(id: string){
    this.router.navigate([`/ticket/open`], { queryParams: {equipamento: id}});
  }

  public desativar(id: string){
    this.confirmationService.confirm({
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      message: 'Confirma a desativação deste equipamento?',
      accept: () => {
        this.equipamentoService.desativar(Number.parseInt(id)).subscribe({
          next: (response) => {
            this.success = response['sucesso'];

            //RETORNO BACK -> REGRAS DE NEGOCIO
            if(this.success == true){
              this.message = response['mensagem'];
              this.notification.showInfo(this.message);
              //this.procurar();
              this.consultarEquipamentos(true);
            }
            else{
              this.message = response['mensagem'];
              this.notification.showError(this.message);
            }
          },
          error: () => {
            //MELHORAR ESTA PARTE
            this.notification.showError('Ocorreu um erro');
          }
        });
      }
    });
  }

  public ativar(id: string){
    this.confirmationService.confirm({
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      message: 'Confirma a ativação deste equipamento?',
      accept: () => {
        this.equipamentoService.ativar(Number.parseInt(id)).subscribe({
          next: (response) => {
            this.success = response['sucesso'];

            //RETORNO BACK -> REGRAS DE NEGOCIO
            if(this.success == true){
              this.message = response['mensagem'];
              this.notification.showInfo(this.message);
              //this.procurar();
              this.consultarEquipamentos(true);
            }
            else{
              this.message = response['mensagem'];
              this.notification.showError(this.message);
            }
          },
          error: () => {
            //MELHORAR ESTA PARTE
            this.notification.showError('Ocorreu um erro');
          }
        });
      }
    });
  }

  public excluir(id: string){
    this.confirmationService.confirm({
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      message: 'Confirma a exclusão deste equipamento? Está ação não poderá ser desfeita!',
      accept: () => {
        this.equipamentoService.excluir(Number.parseInt(id)).subscribe({
          next: (response) => {
            this.success = response['sucesso'];
            //RETORNO BACK -> REGRAS DE NEGOCIO
            if(this.success == true){
              this.message = response['mensagem'];
              this.notification.showInfo(this.message);
              //this.procurar();
              this.consultarEquipamentos(true);
            }
            else{
              this.message = response['mensagem'];
              this.notification.showError(this.message);
            }
          },
          error: () => {
            //MELHORAR ESTA PARTE
            this.notification.showError('Ocorreu um erro');
          }
        });
      }
    });
  }

  public baixar(id: string){
    this.confirmationService.confirm({
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      message: 'Confirma a baixa deste equipamento?',
      accept: () => {
        const equipBaixa = new BaixarEquipamentoRequest();
        equipBaixa.equipamentoId = parseInt(id);
        equipBaixa.motivo = this.motivo;

        this.equipamentoService.baixar(equipBaixa).subscribe({
          next: (response) => {
            this.success = response['sucesso'];
            this.message = response['mensagem'];
            if(this.success){
              this.notification.showSuccess(this.message);
              this.baixaForm.reset();
              //this.procurar();
              this.consultarEquipamentos(true);
            }
            else{
              this.notification.showInfo(this.message);
            }
          },
          error: () => {
            this.notification.showError('Erro ao baixar equipamento');
          }
        });
      }
    });
  }

  private configPagina(){
    if(this.equipments.length > 0){
      this.verGrid = true;
    }
    else {
      this.verGrid = false;
      this.equipments = [];
    }
  }

  private validarFormBaixa(descricao: string){
    this.baixaForm = new FormGroup({
      motivo: new FormControl(descricao, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ])
    });
  }

  private validarFormulario(filtro: FiltroEquipamento){
    this.filtroForm = new FormGroup({
      texto: new FormControl(filtro.texto),
      setor: new FormControl(filtro.setor),
      tipo: new FormControl(filtro.tipo),
      ativo: new FormControl(filtro.ativo)
    });
  }

  /*CONSULTAS **********************************************************/

  private carregarSetor(id: number){
    this.setorService.getById(id).subscribe({
      next: (response) => {
        this.setor = response;
      }
    });
  }

  private consultarEquipamentos(ativo: boolean) {
    this.equipamentoService.getAll(ativo).subscribe({
      next: (response) => {
        this.equipments = response;
        this.configPagina();
      },
      error: () => {
        //MELHORAR ESTA PARTE
        this.notification.showError('Ocorreu um erro');
      }
    });
  }

  private consultarPorNome(texto: string){
    this.equipamentoService.getByNome(texto).subscribe({
      next: (response) => {
        this.equipments = response;
        this.configPagina();
      },
      error: () => {
        //MELHORAR ESTA PARTE
        this.notification.showError('Ocorreu um erro');
      }
    });
  }

  private consultarPorSetor(setorId: number, ativo: boolean){
    this.equipamentoService.getBySetor(setorId, ativo).subscribe({
      next: (response) => {
        this.equipments = response;
        this.configPagina();
      },
      error: () => {
        //MELHORAR ESTA PARTE
        this.notification.showError('Ocorreu um erro');
      }
    });
  }

  private consultarPorTipo(tipoId: number, ativo: boolean){
    this.equipamentoService.getByTipo(tipoId, ativo).subscribe({
      next: (response) => {
        this.equipments = response;
        this.configPagina();
      },
      error: () => {
        //MELHORAR ESTA PARTE
        this.notification.showError('Ocorreu um erro');
      }
    });
  }
  private listarSetores(){
    this.setorService.getAll(true).subscribe({
      next: (response) => {
        this.setores = response;
      },
      error: () => {
        //MELHORAR ESTA PARTE
        this.notification.showError('Ocorreu um erro');
      }
    });
  }

  private listarTipos(){
    this.equipamentoService.getTipos(true).subscribe({
      next: (response) => {
        this.tiposEquipamentos = response;
      },
      error: () => {
        //MELHORAR ESTA PARTE
        this.notification.showError('Ocorreu um erro');
      }
    });
  }
}
