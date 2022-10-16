import { ChamadoResponse } from './../../../models/ticket/chamadoResponse.model';
import { NotificationService } from './../../../services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErroServidor } from './../../../models/erroServidor';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from 'src/app/services/ticket.service';

import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;

  tituloDaPagina: string = 'Chamados';
  chamados: ChamadoResponse[];
  chamado: ChamadoResponse;
  chamadoId: number;
  sucesso: boolean;
  mensagem: string;
  descricao: string;
  erros: ErroServidor[];
  public configuration: Config;
  public columns: Columns[];

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private notification: NotificationService,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService
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
      { key: 'status', title: 'Status' },
      { key: 'dataAbertura', title: 'Aberto em' },
      { key: 'criador.nome', title: 'Criado por' },
      { key: 'setor.nome', title: 'Laboratório' },
      { key: 'action', title: 'Opções', cellTemplate: this.actionTpl, searchEnabled: false }
    ];
  }

  confirm() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            //Actual logic to perform a confirmation
            alert('OK');
        }
    });
  }

  private list() {
    this.listAll();
  }

  public delete(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
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

  public search(){
    this.listByName(/* this.ticketName */);
  }

  private listByName(/* name: string */) {
    this.spinner.show();

    this.ticketService.getAll(/*name*/).subscribe({
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
  }

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


  private listarTodos(){
    this.spinner.show();
    this.ticketService.getAll().subscribe({
      next: (response) => {
        this.chamados = response;
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
        this.notification.showError('Ocorreu um erro');
      }
    })
  }


}
