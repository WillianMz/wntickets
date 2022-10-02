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
      { key: 'action', title: 'Opções', cellTemplate: this.actionTpl, searchEnabled:false }
    ];
  }

  public limparFiltros(){
    this.listarSetores(true);
  }

  public filtrarDesativados(){
    this.listarSetores(false);
  }

  public procurarPorNome(){
    this.listByNome(this.sectorName);
  }

  public consultarEquipamentos(sectorId: string){
    this.router.navigate(['equipment'], {queryParams: { sector: sectorId}});
  }

  public adicionar(){
    this.router.navigate(['labs/new']);
  }

  public editar(sectorId: string){
    this.router.navigate([`labs/edit/${sectorId}`]);
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
          this.spinner.hide();
        }
        else{
          this.message = response['mensagem'];
          this.showError(this.message);
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

  private listarSetores(ativo: boolean) {
    this.spinner.show();

    this.sectorService.getAll(ativo).subscribe({
      next: (response) => {
        this.sectors = response;
        console.log(this.sectors);
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

  //IMPLEMENTAR CONFIRMAÇÃO ANTES DE DESATIVAR
  public desativar(id: string) {
    this.spinner.show();

    this.sectorService.disable(Number.parseInt(id)).subscribe({
      next: (response) => {
        this.success = response['sucesso'];

        //RETORNO BACK -> REGRAS DE NEGOCIO
        if(this.success == true){
          this.message = response['mensagem'];
          this.showSuccess(this.message);
          this.spinner.hide();
        }
        else{
          this.message = response['mensagem'];
          this.showError(this.message);
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

  //IMPLEMENTAR CONFIRMAÇÃO ANTES DE EXCLUIR
  public excluir(id: string){
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
        }
        else{
          this.message = response['mensagem'];
          this.showError(this.message);
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

  private showSuccess(message: string, title?: string){
    this.toastr.success(message, title);
  }

  private showError(message: string, title?: string){
    this.toastr.error(message, title);
  }

}
