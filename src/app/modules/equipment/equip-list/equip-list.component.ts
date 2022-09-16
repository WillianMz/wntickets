import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;

  tituloDaPagina: string = 'Equipamentos';
  equipments: EquipamentoModel[];
  equipmentsCopy: EquipamentoModel[];
  equipment: EquipamentoModel;
  equipmentId: number;
  equipmentName: string;
  filterDisabledEquipments: boolean;
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
      { key: 'setorNome', title:'Setor'},
      { key: 'fabricante', title:'Fabricante'},
      { key: 'marca', title:'Marca'},
      { key: 'numSerial', title: 'Nº serial' },
      { key: 'action', title: 'Opções', cellTemplate: this.actionTpl, searchEnabled:false }
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

/*   private listDisabled() {
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
  } */

  public equipInativos(){
    this.equipmentName = "";
    this.listInativo();
  }

  private listInativo() {
    this.listDisabled();
  }

  private listDisabled() {
    this.spinner.show();

    this.equipamentoService.disabled().subscribe({
      next: (response) => {
        this.equipments = response;
        console.log(this.equipments);
        this.equipmentsCopy = this.equipments;
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

  public equipAtivos(){
    this.equipmentName = "";
    this.listAtivo();
  }

  private listAtivo() {
    this.listEnabled();
  }

  private listEnabled() {
    this.spinner.show();

    this.equipamentoService.enabled().subscribe({
      next: (response) => {
        this.equipments = response;
        console.log(this.equipments);
        this.equipmentsCopy = this.equipments;
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

  public desativar(id: string) {
      this.spinner.show();
  
      this.equipamentoService.disable(Number.parseInt(id)).subscribe({
        next: (response) => {
          console.log(response);
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
            this.notification.showError('Erro ao inativar o equipamento');
            this.spinner.hide();
          }
          
        }
      });
  }

  public ativar(id: string) {
    this.spinner.show();

    this.equipamentoService.enable(Number.parseInt(id)).subscribe({
      next: (response) => {
        console.log(response);
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
          this.notification.showError('Erro ao ativar o equipamento');
          this.spinner.hide();
        }
        
      }
    });
  }

  public delete(id: string) {
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
          this.notification.showError('Erro ao excluir o equipamento');
          this.spinner.hide();
        }
        
      }
    });
  }

  public disable(id: string){
  }

  public openTipoEquip() {
    this.router.navigate(['equipment/type']);
  }

}
