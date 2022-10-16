import { SetorResponse } from './../../../models/sector/setorResponse.model';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ErroServidor } from 'src/app/models/erroServidor';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { SectorService } from 'src/app/services/sector.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.css']
})
export class SectorListComponent implements OnInit {

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  tituloDaPagina: string = 'Laboratórios';
  sectors: SetorResponse[];
  sectorId: number;
  sectorName: string;
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
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.configGrid();
    this.listarSetores(true);
  }

  private configGrid(){
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.fixedColumnWidth = false;
    this.configuration.selectRow = true;
    this.configuration.rows = 10;
    this.configuration.tableLayout.style = 'tiny';
    //colunas
    this.columns = [
      { key: 'id', title: 'Código' },
      { key: 'nome', title: 'Nome' },
      { key: 'ativoString', title: 'Status'},
      { key: 'action', title: 'Opções', cellTemplate: this.actionTpl, searchEnabled:false }
    ];
  }

  public limparFiltros(){
    this.listarSetores(true);
    this.tituloDaPagina = "Laboratórios";
  }

  public procurarPorNome(){
    this.listByNome(this.sectorName);
  }
 
  public consultarEquipamentos(sectorId: string, ativo: boolean){
    this.router.navigate(['equipment'], {queryParams: { sector: sectorId, ativo: ativo}});
  }

  public adicionar(){
    this.router.navigate(['labs/new']);
  }

  public editar(sectorId: string){
    this.router.navigate([`labs/${sectorId}/edit`]);
  }

  public filtrarDesativados(){
    this.listarSetores(false);
    this.tituloDaPagina = "Laboratórios desativados";
  }

  public ativar(id: string) {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.spinner.show();
        this.sectorService.enable(parseInt(id)).subscribe({
          next: (response) => {
            this.success = response['sucesso'];
            this.message = response['mensagem'];
            //RETORNO BACK -> REGRAS DE NEGOCIO
            if(this.success == true){
              this.notification.showSuccess(this.message);
              this.listarSetores(true);
              this.spinner.hide();
            }
            else{
              this.notification.showError(this.message);
              this.spinner.hide();
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
    });
  }

  public desativar(id: string) {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.spinner.show();
        this.sectorService.disable(parseInt(id)).subscribe({
          next: (response) => {
            this.success = response['sucesso'];
            this.message = response['mensagem'];
            //RETORNO BACK -> REGRAS DE NEGOCIO
            if(this.success == true){
              this.notification.showSuccess(this.message);
              this.listarSetores(true);
              this.spinner.hide();
            }
            else{
              this.notification.showWarning(this.message);
              this.spinner.hide();
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
    });
  }
  
  public excluir(id: string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.spinner.show();
        this.sectorService.delete(parseInt(id)).subscribe({
          next: (response) => {
            this.success = response['sucesso'];
            this.message = response['mensagem'];
            //RETORNO BACK -> REGRAS DE NEGOCIO
            if(this.success == true){
              this.notification.showSuccess(this.message);
              this.listarSetores(true);
              this.spinner.hide();
            }
            else{
              this.notification.showWarning(this.message);
              this.spinner.hide();
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
    });
  }

  private listarSetores(ativo: boolean) {
    this.spinner.show();
    this.sectorService.getAll(ativo).subscribe({
      next: (response) => {
        this.sectors = response.map(item => {
          return {
            ...item,
            ativoString: item.ativo ? 'Ativo' : 'Inativo'
          }
        });
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
}
