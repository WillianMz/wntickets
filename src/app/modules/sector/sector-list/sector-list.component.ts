import { ToastrService } from 'ngx-toastr';
import { SetorModel } from './../../../models/sector/setorModel';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;

  //titlePage: string;
  tituloDaPagina: string = 'Laboratórios';
  sectors: SetorModel[];
  sectorsCopy: SetorModel[];
  sector: SetorModel;
  sectorId: number;
  sectorName: string;
  filterDisabledSectors: boolean;
  success: boolean;
  message: string;
  erros: ErroServidor[];

  public configuration: Config;
  public columns: Columns[];

  constructor(
    private sectorService: SectorService,
    private router: Router,
    private notification: NotificationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
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
      { key: 'nome', title: 'Nome' },/* ,
      { key: 'isActive', title: 'Ativo'} */
      { key: 'action', title: 'Opções', cellTemplate: this.actionTpl, searchEnabled:false }
    ];
  }

  private list() {
    this.listAll();
  }

  private listAll() {
    this.spinner.show();

    this.sectorService.getAll().subscribe({
      next: (response) => {
        this.sectors = response;
        console.log(this.sectors);
        this.sectorsCopy = this.sectors;
        this.tituloDaPagina = "Laboratórios";
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

/*   public goCategories(sectorId: string){
    this.router.navigate(['labs/categories'], {queryParams: { sector: sectorId}});
  } */

  public new(){
    this.router.navigate(['labs/new']);
  }

  public edit(sectorId: string){
    this.router.navigate([`labs/edit/${sectorId}`]);
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
        this.tituloDaPagina = "Laboratórios";
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

  public ativar(id: string) {
    this.spinner.show();
  
    this.sectorService.enable(Number.parseInt(id)).subscribe({
      next: (response) => {
        this.success = response['sucesso'];

        //RETORNO BACK -> REGRAS DE NEGOCIO
        if(this.success == true){
          this.message = response['mensagem'];
          this.showSuccess(this.message);
          this.listInativo();
          /* this.router.navigate(['/labs']); */
          this.spinner.hide();
          console.log('1');
        }
        else{
          this.message = response['mensagem'];
          this.showError(this.message);
          this.spinner.hide();
          console.log('2');
        }
      },
      error: (response) => {
        //PEGA OS ERROS. FALHAS
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
      }
    });
    }

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
          this.tituloDaPagina = "Laboratórios";
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

  public desativar(id: string) {
    this.spinner.show();

    this.sectorService.disable(Number.parseInt(id)).subscribe({
      next: (response) => {
        this.success = response['sucesso'];

        //RETORNO BACK -> REGRAS DE NEGOCIO
        if(this.success == true){
          this.message = response['mensagem'];
          this.showSuccess(this.message);
          this.listAtivo();
          /* this.router.navigate(['/labs']); */
          this.spinner.hide();
          console.log('1');
        }
        else{
          this.message = response['mensagem'];
          this.showError(this.message);
          this.spinner.hide();
          console.log('2');
        }
      },
      error: (response) => {
        //PEGA OS ERROS. FALHAS
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
      }
    });
  }

  public delete(id: string){
    this.spinner.show();

    this.sectorService.delete(Number.parseInt(id)).subscribe({
      next: (response) => {
        this.success = response['sucesso'];

        //RETORNO BACK -> REGRAS DE NEGOCIO
        if(this.success == true){
          this.message = response['mensagem'];
          this.showSuccess(this.message);
          this.router.navigate(['/labs']);
          this.spinner.hide();
          console.log('1');
        }
        else{
          this.message = response['mensagem'];
          this.showError(this.message);
          this.spinner.hide();
          console.log('2');
        }
      },
      error: (response) => {
        //PEGA OS ERROS. FALHAS
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
      }
    });
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

  private showSuccess(message: string, title?: string){
    this.toastr.success(message, title);
  }

  private showError(message: string, title?: string){
    this.toastr.error(message, title);
  }

}
