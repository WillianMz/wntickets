import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ErroServidor } from 'src/app/models/erroServidor';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TipoEquiModel } from 'src/app/models/equipment/tipoEquipModel';

@Component({
  selector: 'app-equip-type-list',
  templateUrl: './equip-type-list.component.html',
  styleUrls: ['./equip-type-list.component.css']
})
export class EquipTypeListComponent implements OnInit {

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;

  tituloDaPagina: string = 'Tipos de equipamentos';
  equipmentsType: TipoEquiModel[];
  equipmentsTypeOriginal: TipoEquiModel[];
  equipmentType: TipoEquiModel;
  equipmentTypeId: number;
  equipmentTypeDescricao: string;
  filterDisabledEquipmentType: boolean;
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
      { key: 'action', title: 'Opções', cellTemplate: this.actionTpl, searchEnabled:false },
      { key: 'controlarNumSerialString', title:'Controla Nº Serial'}
    ];
  }

  private list() {
    this.listAll();
  }

  private listAll() {
    this.spinner.show();

    this.equipamentoService.getTipos(true).subscribe({
      next: (response) => {
        this.equipmentsType = response.map(item => {
          return {
            ...item,
            controlarNumSerialString: item.controlarNumSerial ? 'Sim' : 'Não'
          }
        });
        this.tituloDaPagina = "Tipos de Equipamentos (Ativos)";
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

  public alert(){
    this.notification.showInfo('Funcionalidade em desenvolvimento!', 'ATENÇÃO');
  }

  public new(){
    this.router.navigate(['equip-type/new']);
  }

  public edit(equipTypeId: string){
    this.router.navigate([`equip-type/edit/${equipTypeId}`]);
  }

  public cleanFilters() {
    this.listAll();
  }

  public saveFilter(){
    this.list();
    //this.modalRef?.hide();
  }

  public setInativos() {
    this.listDisabled();
  }

  private listDisabled() {
    this.spinner.show();

    this.equipamentoService.disabledTipo().subscribe({
      next: (response) => {
        this.equipmentsType = response;
        this.tituloDaPagina = "Tipos de Equipamentos (Inativos)";
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

  public search(){
    //this.listByNome(this.sectorName);
  }

  public ativar(id: number) {
  this.spinner.show();

  this.equipamentoService.getTipoById(id).subscribe({
    next: (response) => {
      this.equipmentType = response;

      this.equipmentType.ativo = true;
    
      this.equipamentoService.enableTipo(this.equipmentType).subscribe({
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
        });
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

  public desativar(id: number) {
    this.spinner.show();

    this.equipamentoService.getTipoById(id).subscribe({
      next: (response) => {
        this.equipmentType = response;
  
        this.equipmentType.ativo = false;
    
        this.equipamentoService.disableTipo(this.equipmentType).subscribe({
          next: (response) => {
            this.list();
          },
          error: (response) => {
            if (response.status != 405) {
              this.success = response.error['sucesso'];
              this.message = response.error['mensagem'];
              this.erros = response.error['objeto'];
              this.notification.showError('Erro');
            }else {
              this.notification.showError('Erro ao inativar o tipo de equipamento ' + id);
            }
            
          }
        });
        
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

    this.spinner.hide();
  }

}
