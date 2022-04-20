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
import { NgxSpinnerService } from 'ngx-spinner';

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
  filterDisabledCategoryAll: boolean;

  public configuration: Config;
  public columns: Columns[];

  constructor(
    private categoryService: CategoryService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notification: NotificationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
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
      { key: 'isActive', title: 'Opções'}
    ];
  }

  private listAll(){
    this.spinner.show();
    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories = response;
        this.spinner.hide();
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError(this.message, 'Erro');
        this.spinner.hide();
      }
    })
  }

  public listDisabled(){
    this.spinner.show();
    this.categoryService.getDisable().subscribe({
      next: (response) => {
        this.categories = response;
        this.spinner.hide();
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError(this.message, 'Erro');
        this.spinner.hide();
      }
    })
  }

  public listBySector(sectorId: number, disable: boolean) {
    this.spinner.show();
    this.categoryService.getBySector(sectorId, disable).subscribe({
      next: (response) => {
        this.categories = response;
        this.spinner.hide();
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError(this.message, 'Erro');
        this.spinner.hide();
      }
    })
  }

  public listByName(name: string) {
    this.spinner.show();
    this.categoryService.getByName(name).subscribe({
      next: (response) => {
        this.categories = response;
        this.spinner.hide();
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError(this.message, 'Erro');
        this.spinner.hide();
      }
    });
  }

  private list(){
    //filtra categorias pelo id do setor via parametro da URL
    if(this.sectorId){
      this.titlePage = "Categorias do setor";
      this.listBySector(this.sectorId, true);

      if(this.sectorId && this.filterDisabledCategory == true){
        this.titlePage = "Categorias desativadas do setor";
        this.listBySector(this.sectorId, false);
      }
    }
    else{
      //lista todas as categorias independente do setor
      this.titlePage = "Todas as categorias";
      this.listAll();

      if(this.filterDisabledCategory == true){
        this.titlePage = "Categorias desativadas";
        this.listDisabled();
      }
    }
  }

  public saveFilter() {
    this.categoryName = "";
    this.list();
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

  public newTicket(categoryId: string){
    this.router.navigate(['/tickets/new'], {queryParams: {sector: this.sectorId, category: categoryId}});
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
