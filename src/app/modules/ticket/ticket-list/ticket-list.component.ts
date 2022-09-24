import { NotificationService } from './../../../services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErroServidor } from './../../../models/erroServidor';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ToastrService } from 'ngx-toastr';
import { TicketModel } from 'src/app/models/ticket/ticketModel';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;

  /* titlePage: string; */
  tituloDaPagina: string = 'Chamados';
  tickets: TicketModel[];
  ticketsCopy: TicketModel[];
  ticket: TicketModel;
  ticketId: number;
  ticketName: string;
  filterDisabledTicket: boolean;
  success: boolean;
  message: string;
  erros: ErroServidor[];
  public clicked: string;

  public configuration: Config;
  public columns: Columns[];

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private notification: NotificationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.configGrid();
    this.list();
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
      { key: 'statusAtual', title: 'Status' },
      { key: 'dataAbertura', title: 'Aberto em' },
      { key: 'criador', title: 'Criado por' },
      { key: 'action', title: 'Opções', cellTemplate: this.actionTpl, searchEnabled: false }
    ];
  }

  private list() {
    this.listAll();
  }


  private listAll() {    
      this.spinner.show();

      this.ticketService.getAll().subscribe({
        next: (response) => {
          this.tickets = response;
          console.log(this.tickets);
          this.ticketsCopy = this.tickets;
          this.tituloDaPagina = "Chamados";
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

  newTicket() {
    this.router.navigate(['/ticket/new']);
  }

  public cleanFilters(){
    this.filterDisabledTicket = false;
    this.listAll();
  }

  public search(){
    this.listByName(/* this.ticketName */);
  }

  private listByName(/* name: string */) {
    this.spinner.show();

    this.ticketService.getAll(/*name*/).subscribe({
      next: (response) => {
        this.tickets = response;
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

  public edit(ticketId: string){
    this.router.navigate([`/ticket/edit/${ticketId}`]);
  }

  public delete(id: string) {
    this.spinner.show();

    this.ticketService.delete(Number.parseInt(id)).subscribe({
      next: (response) => {
        this.success = response['sucesso'];

        //RETORNO BACK -> REGRAS DE NEGOCIO
        if(this.success == true){
          this.message = response['mensagem'];
          this.showSuccess(this.message);
          this.router.navigate(['/ticket']);
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

  private showSuccess(message: string, title?: string){
    this.toastr.success(message, title);
  }

  private showError(message: string, title?: string){
    this.toastr.error(message, title);
  }

}
