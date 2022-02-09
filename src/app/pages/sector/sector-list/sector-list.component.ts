import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Isector } from 'src/app/models/isector';
import { SectorService } from 'src/app/services/sector.service';

import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.css']
})
export class SectorListComponent implements OnInit {

  titlePage: string;
  sectors: Isector[];
  sector: Isector;
  sectorId: number;
  success: boolean;
  message: string;
  modalRef?: BsModalRef;
  pag : number = 1 ;
  contador : number = 10;
  sectorsDisabled: boolean;
  sectorName: string;

  public configuration: Config;
  public columns: Columns[];

  constructor(
    private sectorService: SectorService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titlePage = "Setores";
    this.configGrid();
    this.listAll();
  }

  public saveFilter(){
    console.log(this.sectorsDisabled);
    if(this.sectorsDisabled){
      this.listDisabled();
      console.log('SOMENTE SETORES DESATIVADOS');
    }
    else{
      this.listAll();
      console.log('SOMENTE SETORES ATIVOS');
    }
    this.modalRef?.hide();
  }

  public alert(){
    window.alert('Funcionalidade não disponível!');
  }

  public listAll(): void{
    if(this.sectorsDisabled){
      this.listDisabled();
      console.log('SOMENTE SETORES DESATIVADOS');
    }
    else{
      setTimeout(() => {
        this.sectorService.getAll().subscribe(response => {
          this.success = response['sucesso'];
          this.message = response['mensagem'];
          this.sectors = response['objeto'];
          this.titlePage = "Setores";
        })
      }, 2000);
    }
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

  public listByName(): void{

    this.sectorName = this.sectorName.trim().toUpperCase();

    if(this.sectorName === "" || this.sectorName == undefined){
      window.alert('Digite algo no campo de pesquisa!');
    }
    else{
      setTimeout(() => {
        this.sectorService.getByName(this.sectorName).subscribe(response => {
          this.success = response['sucesso'];
          this.message = response['mensagem'];
          this.sectors = response['objeto'];
        })
      }, 2000);
    }
  }

  public listDisabled(): void{
    setTimeout(() => {
      this.sectorService.disabled().subscribe(response => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];
        this.sectors = response['objeto'];

        if(this.success == true){
          this.titlePage = "Setores desativados";
        }
      })
    }, 2000);
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
}
