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
    this.configuration.rows = 10;
    //colunas
    this.columns = [
      { key: 'id', title: 'Código' },
      { key: 'nome', title: 'Nome' },
      { key: 'isActive', title: 'Ativo'}
    ];
  }

  private list() {
    /* if(this.filterDisabledSectors){
      this.titlePage = "Setores desativados";
      this.listDisabled();//lista setores desativados
    }
    else{
      this.titlePage = "Laboratórios";
      this.listAll();//lista todos os setores ativos
    } */
    this.listAll();
  }

  private listAll() {
    this.spinner.show();

    this.sectorService.getAll().subscribe({
      next: (response) => {
        this.sectors = response;
        console.log(this.sectors);
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

  private listByNome(name: string) {
    this.spinner.show();
    this.sectorService.getByNome(name).subscribe({
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

/*   private listDisabled() {
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
  } */

  public setInativos(){
    this.sectorName = "";
    this.listInativo();
  }

  private listInativo() {
    this.listDisabled();
  }

  private listDisabled() {
    this.spinner.show();

    this.sectorService.disabled().subscribe({
      next: (response) => {
        this.sectors = response;
        console.log(this.sectors);
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

  public setAtivos(){
    this.sectorName = "";
    this.listAtivo();
  }

  private listAtivo() {
    this.listEnabled();
  }

  private listEnabled() {
    this.spinner.show();

    this.sectorService.enabled().subscribe({
      next: (response) => {
        this.sectors = response;
        console.log(this.sectors);
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

  public saveFilter(){
    this.sectorName = "";
    this.list();
    //this.modalRef?.hide();
  }

  public search(){
    this.listByNome(this.sectorName);
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
    this.router.navigate(['labs/categories'], {queryParams: { sector: sectorId}});
  }

  public new(){
    this.router.navigate(['labs/new']);
  }

  public edit(sectorId: string){
    this.router.navigate([`labs/edit/${sectorId}`]);
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
    this.spinner.show();

    this.sectorService.delete(Number.parseInt(id)).subscribe({
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
          this.notification.showError('Erro ao excluir o setor');
          this.spinner.hide();
        }
        
      }
    });

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
