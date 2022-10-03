import { TipoEquipamentoResponse } from './../../../models/equipment/tipoEquipamentoResponse.model';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErroServidor } from 'src/app/models/erroServidor';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-equip-tipo-list',
  templateUrl: './equip-tipo-list.component.html',
  styleUrls: ['./equip-tipo-list.component.css']
})
export class EquipTipoListComponent implements OnInit {

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;

  tituloDaPagina: string = 'Tipos de equipamentos';
  tiposDeEquipamentos: TipoEquipamentoResponse[];
  tipoEquipamento: TipoEquipamentoResponse;
  tipoEquipamentoId: number;
  
  /* equipmentsType: TipoEquiModel[];
  equipmentType: TipoEquiModel;
  equipmentTypeId: number;
  equipmentTypeDescricao: string;
  filterDisabledEquipmentType: boolean; */
  success: boolean;
  message: string;
  erros: ErroServidor[];

  public configuration: Config;
  public columns: Columns[];

  constructor(
    private equipamentoService: EquipamentoService,
    private router: Router,
    private notification: NotificationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.configGrid();
    this.listAll();
  }

  private configGrid(){
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.fixedColumnWidth = false;
    this.configuration.selectRow = true;
    this.configuration.rows = 10;
    //colunas
    this.columns = [
      { key: 'id', title: 'Código' },
      { key: 'descricao', title: 'Descrição' },
      { key: 'controlarNumSerialString', title:'Controla Nº Serial'},
      { key: 'ativoString', title:'Status'},
      { key: 'action', title: 'Opções', cellTemplate: this.actionTpl, searchEnabled:false }
    ];
  }

  private list() {
    this.listAll();
  }

  private listAll() {
    this.spinner.show();

    this.equipamentoService.getTipos(true).subscribe({
      next: (response) => {
        this.tiposDeEquipamentos = response.map(item => {
          return {
            ...item,
            controlarNumSerialString: item.controlarNumSerial ? 'Sim' : 'Não',
            ativoString: item.ativo ? 'Ativo' : 'Inativo'
          }
        });
        this.tituloDaPagina = "Tipos de Equipamentos";
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

  public new(){
    this.router.navigate(['/new']);
  }

  public edit(equipTypeId: string){
    this.router.navigate([`equip-type/edit/${equipTypeId}`]);
  }

  public cleanFilters() {
    this.listAll();
  }

  public saveFilter(){
    this.list();
  }

  /* public setInativos() {
    this.listDisabled();
  } */

  /* private listDisabled() {
    this.spinner.show();

    this.equipamentoService.disabledTipo().subscribe({
      next: (response) => {
        this.tiposDeEquipamentos = response.map(item => {
          return {
            ...item,
            controlarNumSerialString: item.controlarNumSerial ? 'Sim' : 'Não',
            ativoString: item.ativo ? 'Ativo' : 'Inativo'
          }
        });
        this.tituloDaPagina = "Tipos de Equipamentos";
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
  } */

  public search(){
    //this.listByNome(this.sectorName);
  }

  //REVISAR
  public ativar(id: number) {
  this.spinner.show();

  this.equipamentoService.getTipoById(id).subscribe({
    next: (response) => {
      this.tipoEquipamento = response;

      //this.equipmentType.ativo = true;
    
      /* this.equipamentoService.enableTipo(this.equipmentType).subscribe({
        next: (response) => {
          this.list();
          },
          error: (response) => {
            console.log(response);
            if (response.status != 405) {
              this.success = response.error['sucesso'];
              this.message = response.error['mensagem'];
              this.erros = response.error['objeto'];
              this.notification.showError('Erro');
              this.spinner.hide();
            }else {
              this.notification.showError('Erro ao ativar o tipo de equipamento ' + id);
              this.spinner.hide();
            }
            
          }
        }); */
      },
      error: (response) => {
        if (response.status != 405) {
          this.success = response.error['sucesso'];
          this.message = response.error['mensagem'];
          this.erros = response.error['objeto'];
          this.notification.showError('Erro');
          this.spinner.hide();
        }else {
          this.notification.showError('Erro ao buscar o tipo de equipamento ' + id);
          this.spinner.hide();
        }
        
      }
    });
  }
}
