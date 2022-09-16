import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ErroServidor } from 'src/app/models/erroServidor';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { EquipamentoModel } from 'src/app/models/equipment/equipamentoModel';
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
  statusTipo: boolean;

  public configuration: Config;
  public columns: Columns[];

  constructor(
    private equipamentoService: EquipamentoService,
    private router: Router,
    private notification: NotificationService,
    private spinner: NgxSpinnerService
  ) { this.statusTipo = true; }

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
      { key: 'controlarNumSerial', title:'Controla Nº Serial'},
      { key: 'action', title: 'Opções', cellTemplate: this.actionTpl, searchEnabled:false }
    ];
  }

  private listAll() {
    this.spinner.show();

    this.equipamentoService.getTipos(this.statusTipo).subscribe({
      next: (response) => {
        this.equipmentsType = response;
        if (this.statusTipo == true) {
          this.tituloDaPagina = "Tipos de Equipamentos (Ativos)";
        }else {
          this.tituloDaPagina = "Tipos de Equipamentos (Inativos)";
        }
        
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
    this.router.navigate(['equipment/new']);
  }

  public edit(equipmentId: string){
    this.router.navigate([`equipment/edit/${equipmentId}`]);
  }

  public cleanFilter() {
    this.statusTipo = true;
    this.atualizar();
  }

  public atualizar(){
    this.listAll();
  }

  public listInativos() {
    this.statusTipo = false;
    this.listAll();
  }

  public setInativos() {

  }

  public search() {

  }

}
