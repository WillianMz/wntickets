import { SetorResponse } from './../../../models/sector/setorResponse.model';
import { SectorService } from './../../../services/sector.service';
import { FiltroTicket } from './filtoTicket';
import { FormGroup, FormControl } from '@angular/forms';
import { ChamadoResponse } from './../../../models/ticket/chamadoResponse.model';
import { NotificationService } from './../../../services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErroServidor } from './../../../models/erroServidor';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;

  display: boolean = false;
  tituloDaPagina: string = 'Chamados';
  chamados: ChamadoResponse[];
  chamado: ChamadoResponse;
  setores: SetorResponse[];
  chamadoId: number;
  sucesso: boolean;
  mensagem: string;
  descricao: string;
  filtroForm: FormGroup;
  nomeBotaoFiltro: string = 'Filtro';
  sectorId: number;
  tipoId: number;
  verGrid: boolean = false;
  verComboboxSetores: boolean = false;
  verComboboxTipos: boolean = false;
  campo_pesquisa: boolean = true;
  erros: ErroServidor[];
  public configuration: Config;
  public columns: Columns[];

  constructor(
    private ticketService: TicketService,
    private setorService: SectorService,
    private router: Router,
    private notification: NotificationService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {
    const filtro = new FiltroTicket()
    this.validarFormulario(filtro);
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(
      params => {
        this.sectorId = parseInt(params.sector);
        this.tipoId = parseInt(params.tipo);
      }
    );

    this.configGrid();
    this.list();
    this.listarSetores();
  }

  private configGrid() {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.fixedColumnWidth = false;
    this.configuration.selectRow = true;
    this.configuration.rows = 10;
    this.configuration.columnReorder = true;
    //bordas
    this.configuration.tableLayout.borderless = false;
    //hover
    this.configuration.tableLayout.hover = true;
    this.configuration.tableLayout.striped = true;
    this.configuration.tableLayout.style = 'tiny';
    // ... etc.
    this.columns = [
      { key: 'id', title: 'Código' },
      { key: 'assunto', title: 'Assunto' },
      { key: 'status', title: 'Status' },
      { key: 'dataAbertura', title: 'Aberto em' },
      { key: 'criador.nome', title: 'Criado por' },
      { key: 'setor.nome', title: 'Laboratório' },
      { key: 'action', title: 'Opções', cellTemplate: this.actionTpl, searchEnabled: false }
    ];
  }

  get texto(){
    return this.filtroForm.get('texto')?.value;
  }

  get setorID() {
    return this.filtroForm.get('setor')?.value;
  }

  get tipoID(){
    return this.filtroForm.get('tipo')?.value;
  }

  showDialog() {
    this.display = true;
  }

  private list() {
    this.listAll();
  }

  public delete(id: string) {
    this.spinner.show();

    this.ticketService.delete(Number.parseInt(id)).subscribe({
      next: (response) => {
        this.sucesso = response['sucesso'];

        //RETORNO BACK -> REGRAS DE NEGOCIO
        if(this.sucesso == true){
          this.mensagem = response['mensagem'];
          this.notification.showSuccess(this.mensagem);
          this.router.navigate(['/ticket']);
          this.spinner.hide();
          console.log('1');
        }
        else{
          this.mensagem = response['mensagem'];
          this.notification.showError(this.mensagem);
          this.spinner.hide();
          console.log('2');
        }
      },
      error: (response) => {
        //PEGA OS ERROS. FALHAS
        this.sucesso = response.error['sucesso'];
        this.mensagem = response.error['mensagem'];
        this.erros = response.error['objeto'];
      }
    });
  }


  newTicket() {
    this.router.navigate(['/ticket/open']);
  }

  public edit(ticketId: string){
    this.router.navigate([`/ticket/${ticketId}/edit`]);
  }

  public cleanFilters(){
    this.listAll();
  }

  /* public search(){
    this.listByName();
  } */

  /* private listByName() {
    this.spinner.show();

    this.ticketService.getAll().subscribe({
      next: (response) => {
        this.chamados = response;
        this.spinner.hide();
      },
      error: (response) => {
        this.sucesso = response.error['sucesso'];
        this.mensagem = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.spinner.hide();
      }
    });
  } */

  private listAll() {    
    this.spinner.show();

    this.ticketService.getAll().subscribe({
      next: (response) => {
        this.chamados = response;
        this.tituloDaPagina = "Chamados";
        this.spinner.hide();
      },
      error: (response) => {
        this.chamados = response.error['sucesso'];
        this.mensagem = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError('Erro ao obter dados');
        this.spinner.hide();
      }
    });
  }

  public filtrarPor(filtro: number){
    switch(filtro) {
      case 1://TODOS
      this.nomeBotaoFiltro = 'Todos';
        this.verComboboxSetores = false;
        this.verComboboxTipos = false;
        this.campo_pesquisa = true;
        this.consultarTicket();
        break;
      case 2://SETOR
        this.nomeBotaoFiltro = 'Filtrando por laboratório';
        this.verComboboxSetores = true;
        this.verComboboxTipos = false;
        this.campo_pesquisa = false;
        break;
      case 3://TIPO
        this.nomeBotaoFiltro = 'Filtrando por tipo';
        this.verComboboxSetores = false;
        this.verComboboxTipos = true;
        this.campo_pesquisa = false;
        break;
      case 4://DESCRIÇÃO
        this.nomeBotaoFiltro = 'Filtrando por descrição';
        this.verComboboxSetores = false;
        this.verComboboxTipos = false;
        this.campo_pesquisa = true;
        this.consultarPorDescricao(this.texto);
        break;
        case 5://SOLUÇÃO
        this.nomeBotaoFiltro = 'Filtrando por solução';
        this.verComboboxSetores = false;
        this.verComboboxTipos = false;
        this.campo_pesquisa = true;
        this.consultarPorSolucao(this.texto);
        break;
      default:
        this.nomeBotaoFiltro = 'Todos';
        this.verComboboxSetores = false;
        this.verComboboxTipos = false;
        this.campo_pesquisa = true;
        break;
    }
  }

  public limparFiltros(){
    this.nomeBotaoFiltro = 'Padrão';
    this.verComboboxSetores = false;
    this.verComboboxTipos = false;
    this.campo_pesquisa = true;
    this.router.navigate(['ticket']);
    this.consultarTicket();
  }

  public procurar(){
    if(this.setorID){
      this.consultarPorSetor(this.setorID);
    }
    if(this.tipoID){
      this.consultarPorTipo(this.tipoID);
    }
    if(this.sectorId){
      this.consultarPorSetor(this.sectorId);
    }
    if(this.tipoId){
      this.consultarPorTipo(this.tipoId);
    }
    if(this.texto){
      this.consultarPorAssunto(this.texto);
    }
    if(this.texto){
      this.consultarPorDescricao(this.texto);
    }
    if(this.texto){
      this.consultarPorSolucao(this.texto);
    }
  }

  private configPagina(){
    if(this.chamados.length > 0){
      this.verGrid = true;
    }
    else {
      this.verGrid = false;
      this.chamados = [];
    }
  }

  private validarFormulario(filtro: FiltroTicket){
    this.filtroForm = new FormGroup({
      texto: new FormControl(filtro.texto),
      setor: new FormControl(filtro.setor),
      tipo: new FormControl(filtro.tipo),
      ativo: new FormControl(filtro.ativo)
    });
  }

  /*CONSULTAS **********************************************************/

  private consultarTicket() {
    this.spinner.show();
    this.ticketService.getAll().subscribe({
      next: (response) => {
        this.chamados = response;
        this.configPagina();
        this.spinner.hide();
      },
      error: () => {
        //MELHORAR ESTA PARTE
        this.notification.showError('Ocorreu um erro');
      }
    });
  }

  private consultarPorSetor(setorId: number){
    this.spinner.show();
    this.ticketService.getBySetor(setorId).subscribe({
      next: (response) => {
        this.chamados = response;
        this.configPagina();
        this.spinner.hide();
      },
      error: () => {
        //MELHORAR ESTA PARTE
        this.notification.showError('Ocorreu um erro');
      }
    });
  }

  private listarSetores(){
    this.setorService.getAll(true).subscribe({
      next: (response) => {
        this.setores = response;
      },
      error: () => {
        //MELHORAR ESTA PARTE
        this.notification.showError('Ocorreu um erro');
      }
    });
  }

  private consultarPorTipo(tipoId: number){
    this.spinner.show();
    this.ticketService.getByTipo(tipoId).subscribe({
      next: (response) => {
        this.chamados = response;
        this.configPagina();
        this.spinner.hide();
      },
      error: () => {
        //MELHORAR ESTA PARTE
        this.notification.showError('Ocorreu um erro');
      }
    });
  }

  private consultarPorAssunto(texto: string){
    this.spinner.show();
    this.ticketService.getByAssunto(texto).subscribe({
      next: (response) => {
        this.chamados = response;
        this.configPagina();
        this.spinner.hide();
      },
      error: () => {
        //MELHORAR ESTA PARTE
        this.notification.showError('Ocorreu um erro');
      }
    });
  }

  private consultarPorDescricao(texto: string){
    this.spinner.show();
    this.ticketService.getByDescricao(texto).subscribe({
      next: (response) => {
        this.chamados = response;
        this.configPagina();
        this.spinner.hide();
      },
      error: () => {
        //MELHORAR ESTA PARTE
        this.notification.showError('Ocorreu um erro');
      }
    });
  }

  private consultarPorSolucao(texto: string){
    this.spinner.show();
    this.ticketService.getBySolucao(texto).subscribe({
      next: (response) => {
        this.chamados = response;
        this.configPagina();
        this.spinner.hide();
      },
      error: () => {
        //MELHORAR ESTA PARTE
        this.notification.showError('Ocorreu um erro');
      }
    });
  }

}
