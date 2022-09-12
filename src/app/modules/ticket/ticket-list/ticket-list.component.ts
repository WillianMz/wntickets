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

  titlePage: string;
  tickets: TicketModel[];
  ticket: TicketModel;
  ticketId: number;
  success: boolean;
  message: string;
  public clicked: string;

  public configuration: Config;
  public columns: Columns[];

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
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
      { key: 'criador', title: 'Criado por' },
      { key: 'dataAbertura', title: 'Aberto em' },
      { key: 'statusAtual', title: 'Status' },
      //{ key: 'prioridadeAtual', title: 'Prioridade'},
      //{ key: 'setor', title: 'Setor' },      
      { key: 'action', title: '', cellTemplate: this.actionTpl, searchEnabled: false },
      //{ key: 'action', title: 'Actions', cellTemplate: this.actionTpl },
      
    ];

    this.listAll();
  }

  eventEmitted($event: { event: string; value: any }): void {
    //this.clicked = JSON.stringify($event);
    // eslint-disable-next-line no-console
    //console.log('$event', $event);
    //alert($event);
  }

  newTicket() {
    this.router.navigate(['/ticket/new']);
  }

  private listAll() {    
    this.tickets = [
      {
        id: 123, criador: 'Willian', setor: 'Suporte', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal',
        descricao: 'AJFDHALKSJDHFALKSJDFH LAKSJDFHAKJLSDHFALKSJDHFAKLSJDFH ALKSJDFHAKLJSDHFLKAJSDHF LAKJSDHFLKAJSHDFLKJSAHDF LKASJDHFALKSJDHFAKLJSDFH '
      },
      {
        id: 456, criador: 'Willian', setor: 'Suporte', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'ERRO AO ATUALIZAR SISTEMA', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 789, criador: 'Willian', setor: 'Suporte', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMANDO INVÁLIDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 321, criador: 'Willian', setor: 'Suporte', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'IMPORTAR DADOS DE XML', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 654, criador: 'Willian', setor: 'Desenvolvimento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'INSTALAR PROGRAMA MICROSOFT OFFICE 365 HOJE', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 987, criador: 'Luna', setor: 'Desenvolvimento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'SOLICITACAO DE MANUTENCAO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 147, criador: 'Helena', setor: 'Desenvolvimento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'MONTAGEM DE NOVO COMPUTADOR', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 123, criador: 'Willian', setor: 'Desenvolvimento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 456, criador: 'Willian', setor: 'Desenvolvimento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 789, criador: 'Willian', setor: 'Manutenção', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 321, criador: 'Willian', setor: 'Manutenção', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 654, criador: 'Willian', setor: 'Manutenção', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 987, criador: 'Willian', setor: 'Manutenção', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 147, criador: 'Willian', setor: 'Manutenção', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 123, criador: 'Willian', setor: 'Manutenção', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 456, criador: 'Willian', setor: 'Treinamento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 789, criador: 'Willian', setor: 'Treinamento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 321, criador: 'Willian', setor: 'Treinamento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 654, criador: 'Willian', setor: 'Treinamento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 987, criador: 'Willian', setor: 'Treinamento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 147, criador: 'Willian', setor: 'Treinamento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      }
    ];
    console.log(this.tickets);


    /* this.ticketService.getAll().subscribe({
      next: (response) => {
        this.tickets = response;
        this.titlePage = "Tickets";
      },
      error: (response) => {
        alert(response.error);
      }
    }) */
  }

}
