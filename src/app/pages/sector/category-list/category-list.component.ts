import { ErroServidor } from './../../../models/erroServidor';
import { SectorService } from 'src/app/services/sector.service';
import { Isector } from 'src/app/models/isector';
import { CategoryService } from './../../../services/category.service';
import { Icategory } from './../../../models/icategory';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';

import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  titlePage: string;
  idSector: number;
  sector: Isector;
  categories: Icategory[];
  category: Icategory;
  sectorId: number;
  success: boolean;
  message: string;
  modalRef?: BsModalRef;
  categoryDisabled: boolean;
  categoryName: string;
  erros: ErroServidor[];

  public configuration: Config;
  public columns: Columns[];

  constructor(
    private categoryService: CategoryService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.titlePage = "Categorias";
    this.configGrid();

    this.activatedRoute.queryParams.subscribe(
      params => {
        this.sectorId = parseInt(params.sector);
        console.log(`SETOR: ${this.sectorId}`);
      }
    );

    this.list();
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

  private configGrid(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.fixedColumnWidth = false;
    this.configuration.selectRow = true;
    this.configuration.rows = 5;
    //colunas
    this.columns = [
      { key: 'id', title: 'Id' },
      { key: 'nome', title: 'Nome do setor' },
      { key: 'setor', title: 'Setor' },
      { key: 'isActive', title: 'Opções'}
    ];
  }

  private listAll(){
    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];
        this.categories = response;
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.showError(this.message, 'Ocorreu um erro');
      }
    })
  }

  public listDisabled(){
    this.categoryService.getDisable().subscribe({
      next: (response) => {
        this.titlePage = "Categorias desativadas";
        this.success = response['sucesso'];
        this.message = response['mensagem'];
        this.categories = response;
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.showError(this.message, 'Ocorreu um erro');
      }
    })
  }

  public listBySector(sectorId: number, disable: boolean) {
    this.categoryService.getBySector(sectorId, disable).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];
        this.categories = response;
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.showError(this.message, 'Ocorreu um erro');
      }
    })
  }

  public listByName(name: string) {
    this.categoryService.getByName(name).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];
        this.categories = response;
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.showError(this.message, 'Ocorreu um erro');
      }
    })
  }

  private list(): void{
    if(this.sectorId){
      this.titlePage = "Categorias do setor"
      this.listBySector(this.sectorId, true);
    }
    else{
      this.titlePage = "Categorias";
      this.listAll();
    }
  }

  public saveFilter() {
    this.categoryName = "";

    if(this.sectorId && this.categoryDisabled){
      this.listBySector(this.sectorId, false);
    }

    if(this.categoryDisabled){
      this.listDisabled();
    }
    else{
      this.list();
    }

    this.modalRef?.hide();
  }

  public search() {
    this.listByName(this.categoryName);
  }

  public alert(){
    window.alert('Funcionalidade não disponível!');
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public newTicket(){
    this.router.navigate(['/tickets/new']);
  }

  public new(){
    this.router.navigate(['/sectors/category/new'], {queryParams: { sector: this.sectorId}});
    console.log(this.sectorId);
  }

  public edit(categoryId: string){
    this.router.navigate([`/sectors/category/${categoryId}/edit`]);
  }

  public delete(id: string){
    let categId = parseInt(id);
    this.categoryService.delete(categId).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];

        if(this.success == true){
          this.showSuccess(this.message);
          this.list();
        }
      }
    })
  }

  public enable(id: string){
    let categId = parseInt(id);
    this.categoryService.enable(categId).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];

        if(this.success == true){
          this.showSuccess(this.message);
          this.list();
        }
      }
    })
  }

  public disable(id: string){
    let categId = parseInt(id);
    this.categoryService.disable(categId).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];

        if(this.success == true){
          this.list();
        }
      }
    })
  }
}
