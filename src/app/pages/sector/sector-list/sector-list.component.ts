import { NotificationService } from './../../../services/notification.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Isector } from 'src/app/models/isector';
import { SectorService } from 'src/app/services/sector.service';

import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ErroServidor } from 'src/app/models/erroServidor';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.css']
})
export class SectorListComponent implements OnInit {

  titlePage: string;
  sectors: Isector[];
  sectorsCopy: Isector[];
  sector: Isector;
  sectorId: number;
  success: boolean;
  message: string;
  modalRef?: BsModalRef;
  filterDisabledSectors: boolean;
  sectorName: string;
  erros: ErroServidor[];

  public configuration: Config;
  public columns: Columns[];

  constructor(
    private sectorService: SectorService,
    private modalService: BsModalService,
    private router: Router,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.titlePage = "Setores";
    this.configGrid();
    this.listAll();
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

  private listAll() {
    Swal.fire({
      title: 'aguarde...',
      text: 'Carregando dados',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading(), 100
      }
    }).then((result) => {
      this.sectorService.getAll().subscribe({
        next: (response) => {
          this.sectors = response;
          this.sectorsCopy = this.sectors;
          this.titlePage = "Setores";
        },
        error: (response) => {
          this.success = response.error['sucesso'];
          this.message = response.error['mensagem'];
          this.erros = response.error['objeto'];
          this.notification.showError(this.message);
        }
      });
    });



    /* this.sectorService.getAll().subscribe({
      next: (response) => {
        this.sectors = response;
        this.sectorsCopy = this.sectors;
        this.titlePage = "Setores";
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError(this.message);
      }
    }); */
  }

  private listByName(name: string) {
    this.sectorService.getByName(name).subscribe({
      next: (response) => {
        this.sectors = response;
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
      }
    });
  }

  private listDisabled() {
    this.sectorService.disabled().subscribe({
      next: (response) => {
        this.sectors = response;
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
      }
    });
  }

  public saveFilter(){
    console.log(this.filterDisabledSectors);
    this.sectorName = "";
    if(this.filterDisabledSectors){
      this.listDisabled();//lista setores desativados
    }
    else{
      this.listAll();//lista todos os setores ativos
    }

    this.modalRef?.hide();
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
    this.modalRef = this.modalService.show(template);
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
    Swal.fire({
      title:'Ativar o setor?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if(result.value) {
        let sectorId = parseInt(id);
        this.sectorService.enable(sectorId).subscribe({
          next: (response) => {
            this.success = response['sucesso'];
            this.message = response['mensagem'];

            if(this.success == true){
              this.notification.showSuccess(this.message);
              this.listAll();
            }
            else{
              Swal.fire('teste', this.message,'error');
            }
          }
        });
      }
    });
  }

  public delete(id: string){
    Swal.fire({
      title:'Confirmar exclusão do setor?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if(result.value) {
        let sectorId = parseInt(id);
        this.sectorService.delete(sectorId).subscribe({
          next: (response) => {
            this.success = response['sucesso'];
            this.message = response['mensagem'];

            if(this.success == true){
              this.notification.showSuccess(this.message);
              this.listAll();
            }
            else{
              Swal.fire('teste', this.message,'error');
            }
          }
        });
      }
    });
  }

  public disable(id: string){
    Swal.fire({
      title:'Desativar setor?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if(result.value){
        let sectorId = parseInt(id);
        this.sectorService.disable(sectorId).subscribe({
          next: (response) => {
            this.success = response['sucesso'];
            this.message = response['mensagem'];

            if(this.success == true){
              this.notification.showSuccess(this.message);
              this.listAll();
            }
            else{
              Swal.fire('', this.message,'error');
            }
          }
        });
      }
    });
  }
}
