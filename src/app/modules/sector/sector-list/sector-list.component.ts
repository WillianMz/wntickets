import { SetorModel } from './../../../models/sector/setorModel';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ErroServidor } from 'src/app/models/erroServidor';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { SectorService } from 'src/app/services/sector.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.css']
})
export class SectorListComponent implements OnInit {

  titlePage: string;
  sectors: SetorModel[];
  sectorsCopy: SetorModel[];
  sector: SetorModel;
  sectorId: number;
  success: boolean;
  message: string;
  filterDisabledSectors: boolean;
  sectorName: string;
  erros: ErroServidor[];

  public configuration: Config;
  public columns: Columns[];

  constructor(
    private sectorService: SectorService,
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
    this.configuration.rows = 5;
    //colunas
    this.columns = [
      { key: 'id', title: 'Id' },
      { key: 'nome', title: 'Nome do setor' },
      { key: 'isActive', title: 'Editar'}
    ];
  }

  private list() {
    if(this.filterDisabledSectors){
      this.titlePage = "Setores desativados";
      this.listDisabled();//lista setores desativados
    }
    else{
      this.titlePage = "Setores";
      this.listAll();//lista todos os setores ativos
    }
  }

  private listAll() {
    this.spinner.show();

    this.sectorService.getAll().subscribe({
      next: (response) => {
        this.sectors = response;
        this.sectorsCopy = this.sectors;
        this.titlePage = "Setores";
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
    this.sectorService.getByName(name).subscribe({
      next: (response) => {
        this.sectors = response;
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
    this.sectorService.disabled().subscribe({
      next: (response) => {
        this.sectors = response;
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
    this.sectorName = "";
    this.list();
    //this.modalRef?.hide();
  }

  public search(){
    this.listByName(this.sectorName);
  }

  public alert(){
    this.notification.showInfo('Funcionalidade em desenvolvimento!', 'ATENÇÃO');
  }

  public cleanFilters(){
    this.filterDisabledSectors = false;
    this.listAll();
  }

  public openModal(template: TemplateRef<any>) {
    //this.modalRef = this.modalService.show(template);
  }

  public goCategories(sectorId: string){
    this.router.navigate(['sectors/categories'], {queryParams: { sector: sectorId}});
  }

  public new(){
    this.router.navigate(['sectors/new']);
  }

  public edit(sectorId: string){
    this.router.navigate([`sectors/${sectorId}/edit`]);
  }

  public enable(id: string){
    /* Swal.fire({
      title:'Ativar o setor?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if(result.value) {
        this.spinner.show();
        let sectorId = parseInt(id);
        this.sectorService.enable(sectorId).subscribe({
          next: (response) => {
            this.success = response['sucesso'];
            this.message = response['mensagem'];

            if(this.success == true){
              this.notification.showSuccess(this.message);
              this.list();
              this.spinner.hide();
            }
            else{
              Swal.fire('teste', this.message,'error');
            }
          },
          error: () => {
            this.spinner.hide();
          }
        });

      }
    }); */
  }

  public delete(id: string){
    /* Swal.fire({
      title:'Confirmar exclusão do setor?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if(result.value) {
        this.spinner.show();
        let sectorId = parseInt(id);
        this.spinner.show();
        this.sectorService.delete(sectorId).subscribe({
          next: (response) => {
            this.success = response['sucesso'];
            this.message = response['mensagem'];

            if(this.success == true){
              this.notification.showSuccess(this.message);
              this.list();
            }
            else{
              Swal.fire('teste', this.message,'error');
            }
          },
          error: () => {
            this.spinner.hide();
          }
        });
      }
    }); */
  }

  public disable(id: string){
    /* Swal.fire({
      title:'Desativar setor?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if(result.value){
        this.spinner.show();
        let sectorId = parseInt(id);
        this.sectorService.disable(sectorId).subscribe({
          next: (response) => {
            this.success = response['sucesso'];
            this.message = response['mensagem'];

            if(this.success == true){
              this.notification.showSuccess(this.message);
              this.list();
            }
            else{
              Swal.fire('', this.message,'error');
            }
          },
          error: () => {
            this.spinner.hide();
          }
        });
      }
    }); */
  }

}
