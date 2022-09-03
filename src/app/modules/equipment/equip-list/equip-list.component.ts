import { Component, OnInit, TemplateRef } from '@angular/core';
import { ErroServidor } from 'src/app/models/erroServidor';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { EquipamentoModel } from 'src/app/models/equipment/equipamentoModel';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-equip-list',
  templateUrl: './equip-list.component.html',
  styleUrls: ['./equip-list.component.css']
})
export class EquipListComponent implements OnInit {

  titlePage: string;
  equipments: EquipamentoModel[];
  equipmentsCopy: EquipamentoModel[];
  equipment: EquipamentoModel;
  equipmentId: number;
  success: boolean;
  message: string;
  filterDisabledEquipments: boolean;
  equipmentName: string;
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
    this.list();
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
      { key: 'nome', title: 'Nome' },
      { key: 'numserial', title: 'Nº serial' },
      { key: 'isActive', title: 'Editar'}
    ];
  }

  private list() {
    this.listAll();
  }

  private listAll() {
    this.spinner.show();

    this.equipamentoService.getAll().subscribe({
      next: (response) => {
        this.equipments = response;
        console.log(this.equipments);
        this.equipmentsCopy = this.equipments;
        this.titlePage = "Equipamentos";
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

  private listByName(name: string) {
    this.spinner.show();
    this.equipamentoService.getByName(name).subscribe({
      next: (response) => {
        this.equipments = response;
        this.spinner.hide();
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.spinner.hide();
      }
    });
  }

  private listDisabled() {
    this.spinner.show();
    this.equipamentoService.disabled().subscribe({
      next: (response) => {
        this.equipments = response;
        this.spinner.hide();
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.spinner.hide();
      }
    });
  }

  public saveFilter(){
    this.equipmentName = "";
    this.list();
    //this.modalRef?.hide();
  }

  public search(){
    this.listByName(this.equipmentName);
  }

  public alert(){
    this.notification.showInfo('Funcionalidade em desenvolvimento!', 'ATENÇÃO');
  }

  public cleanFilters(){
    this.filterDisabledEquipments = false;
    this.listAll();
  }

  public openModal(template: TemplateRef<any>) {
    //this.modalRef = this.modalService.show(template);
  }

  public new(){
    this.router.navigate(['equipment/new']);
  }

  public edit(equipmentId: string){
    this.router.navigate([`equipment/edit/${equipmentId}`]);
  }

  public enable(id: string){
  }

  public delete(id: string){
    this.spinner.show();

    this.equipamentoService.delete(Number.parseInt(id)).subscribe({
      next: (response) => {
        console.log(response);
        this.list();
      },
      // error: (HttpErrorResponse) => {
      //   this.notification.showError('Erro ao excluir equipamento');
      //   this.spinner.hide();
      // },
      error: (response) => {
        console.log(response);
        if (response.status != 405) {
          this.success = response.error['sucesso'];
          this.message = response.error['mensagem'];
          this.erros = response.error['objeto'];
          this.notification.showError('Erro');
          this.spinner.hide();
        }else {
          this.notification.showError('Erro ao excluir equipamento');
          this.spinner.hide();
        }
        
      }
    });
  }

  public disable(id: string){
  }

}
