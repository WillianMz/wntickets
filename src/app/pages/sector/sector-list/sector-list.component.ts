import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Isector } from 'src/app/models/isector';
import { SectorService } from 'src/app/services/sector.service';

import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ErroServidor } from 'src/app/models/erroServidor';
import { ToastrService } from 'ngx-toastr';

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
  sectorsDisabled: boolean;
  sectorName: string;
  erros: ErroServidor[];

  public configuration: Config;
  public columns: Columns[];

  constructor(
    private sectorService: SectorService,
    private modalService: BsModalService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.titlePage = "Setores";
    this.configGrid();
    this.listAll();
  }

  private showSuccess(message: string, title?: string){
    this.toastr.success(message, title);
  }

  private showError(message: string, title?: string){
    this.toastr.error(message, title);
  }

  private showMessage(message: string, title?: string){
    this.toastr.info(message, title);
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
    setTimeout(() => {
      this.sectorService.getAll().subscribe({
        next: (response) => {
          this.success = response['sucesso'];
          this.message = response['mensagem'];

          //IMPLEMENTAR UMA BLOCO DE CODIGO PARA DIMINUIR
          //A REPETIÇÃO NOS DEMAIS COMANDOS DE CONSULTA A SEGUIR
          if(this.success == true) {
            this.sectors = response['objeto'];
            this.sectorsCopy = this.sectors;
            this.titlePage = "Setores";
          }
          else {
            this.message = response['mensagem'];
            this.sectors = [];
            this.sectorsCopy = [];
          }
        },
        error: (response) => {
          this.success = response.error['sucesso'];
          this.message = response.error['mensagem'];
          this.erros = response.error['objeto'];
        }
      })
    }, 2000);
  }

  private listByName(name: string) {
    setTimeout(() => {
      this.sectorService.getByName(name).subscribe({
        next: (response) => {
          this.success = response['sucesso'];
          this.message = response['mensagem'];

          if(this.success == true) {
            this.sectors = response['objeto'];
            this.sectorsCopy = this.sectors;
            this.titlePage = "Setores";
          }
          else {
            this.message = response['mensagem'];
            this.sectors = [];
            this.sectorsCopy = [];
          }
        },
        error: (response) => {
          this.success = response.error['sucesso'];
          this.message = response.error['mensagem'];
          this.erros = response.error['objeto'];
        }
      })
    }, 2000);
  }

  private listDisabled() {
    setTimeout(() => {
      this.sectorService.disabled().subscribe({
        next: (response) => {
          this.success = response['sucesso'];
          this.message = response['mensagem'];

          if(this.success == true) {
            this.sectors = response['objeto'];
            this.sectorsCopy = this.sectors;
            this.titlePage = "Setores";
            this.showMessage(this.message);
          }
          else {
            this.message = response['mensagem'];
            this.sectors = [];
            this.sectorsCopy = [];
          }
        },
        error: (response) => {
          this.success = response.error['sucesso'];
          this.message = response.error['mensagem'];
          this.erros = response.error['objeto'];
        }
      })
    }, 2000);
  }

  public saveFilter(){
    console.log(this.sectorsDisabled);
    this.sectorName = "";
    if(this.sectorsDisabled){
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
    //window.alert('Funcionalidade não disponível!');
    this.showMessage('Funcionalidade em desenvolvimento!', 'ATENÇÃO');
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
    let sectorId = parseInt(id);
    this.sectorService.enable(sectorId).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];

        if(this.success == true){
          this.listAll();
        }
      }
    })
  }

  public delete(id: string){
    let sectorId = parseInt(id);
    this.sectorService.delete(sectorId).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];

        if(this.success == true){
          this.listAll();
        }
      }
    })
  }

  public disable(id: string){
    let sectorId = parseInt(id);
    this.sectorService.disable(sectorId).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];

        if(this.success == true){
          this.listAll();
        }
      }
    })
  }
}
