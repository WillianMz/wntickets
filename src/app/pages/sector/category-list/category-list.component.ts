import { NotificationService } from './../../../services/notification.service';
import { ErroServidor } from './../../../models/erroServidor';
import { Isector } from 'src/app/models/isector';
import { CategoryService } from './../../../services/category.service';
import { Icategory } from './../../../models/icategory';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  titlePage: string;
  sector: Isector;
  categories: Icategory[];
  category: Icategory;
  sectorId: number;
  success: boolean;
  message: string;
  modalRef?: BsModalRef;
  categoryName: string;
  erros: ErroServidor[];
  //variaveis de filtro
  filterDisabledCategory: boolean;

  public configuration: Config;
  public columns: Columns[];

  constructor(
    private categoryService: CategoryService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.titlePage = "Categorias";
    this.configGrid();

    this.activatedRoute.queryParams.subscribe(
      params => {
        this.sectorId = parseInt(params.sector);
      }
    );

    this.list();
  }

  private configGrid(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.fixedColumnWidth = false;
    this.configuration.selectRow = true;
    this.configuration.rows = 5;
    //colunas
    this.columns = [
      { key: 'id', title: 'Id' },
      { key: 'nome', title: 'Descrição' },
      //{ key: 'setor', title: 'Setor' },
      { key: 'isActive', title: 'Opções'}
    ];
  }

  /* private listAll(){
    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories = response;
        this.titlePage = 'Todas as categorias';
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError(this.message, 'Erro');
      }
    })
  } */

  public listDisabled(){
    this.categoryService.getDisable().subscribe({
      next: (response) => {
        this.titlePage = "Categorias desativadas";
        this.categories = response;
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError(this.message, 'Erro');
      }
    })
  }

  public listBySector(sectorId: number, disable: boolean) {
    this.categoryService.getBySector(sectorId, disable).subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError(this.message, 'Erro');
      }
    })
  }

  public listByName(name: string) {
    this.categoryService.getByName(name).subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError(this.message, 'Erro');
      }
    });
  }

  private list(): void{
    if(this.sectorId){
      this.titlePage = "Categorias do setor"
      this.listBySector(this.sectorId, true);
    }
    else{
      this.titlePage = "Categorias";
      //this.listAll();
      this.categories = [];
    }
  }

  public saveFilter() {
    this.categoryName = "";

    if(this.sectorId && this.filterDisabledCategory){
      this.listBySector(this.sectorId, false);
    }

    if(this.filterDisabledCategory){
      this.listDisabled();
    }
    else{
      this.list();
    }

    this.modalRef?.hide();
  }

  public cleanFilters(){
    this.filterDisabledCategory = false;
    this.list();
  }

  public search() {
    this.listByName(this.categoryName);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public newTicket(){
    this.router.navigate(['/tickets/new']);
  }

  public new(){
    this.router.navigate(['/sectors/category/new'], {queryParams: { sector: this.sectorId}});
  }

  public edit(categoryId: string){
    this.router.navigate([`/sectors/category/${categoryId}/edit`]);
  }

  public delete(id: string){
    Swal.fire({
      title:'Excluír categoria?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if(result.value) {
        let categId = parseInt(id);
        this.categoryService.delete(categId).subscribe({
          next: (response) => {
            this.success = response['sucesso'];
            this.message = response['mensagem'];

            if(this.success == true){
              this.notification.showSuccess(this.message);
              this.list();
            }
          }
        });
      }
    });
  }

  public enable(id: string){
    Swal.fire({
      title:'Ativar categoria?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if(result.value) {
        let categId = parseInt(id);
        this.categoryService.enable(categId).subscribe({
          next: (response) => {
            this.success = response['sucesso'];
            this.message = response['mensagem'];

            if(this.success == true){
              this.notification.showSuccess(this.message);
              this.list();
            }
          }
        });
      }
    });
  }

  public disable(id: string){
    Swal.fire({
      title:'Desativar categoria?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if(result.value) {
        let categId = parseInt(id);
        this.categoryService.disable(categId).subscribe({
          next: (response) => {
            this.success = response['sucesso'];
            this.message = response['mensagem'];

            if(this.success == true){
              this.notification.showSuccess(this.message);
              this.list();
            }
          }
        });
      }
    });
  }
}
