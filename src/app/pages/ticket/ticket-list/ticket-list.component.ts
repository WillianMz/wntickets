import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TicketService } from './../../../services/ticket.service';
import { TicketModel } from './../../../models/ticket/ticketModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  titlePage: string;
  tickets: TicketModel[];
  ticket: TicketModel;
  ticketId: number;
  success: boolean;
  message: string;

  public configuration: Config;
  public columns: Columns[];

  constructor(
    private ticketService: TicketService,
    private modalService: BsModalService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.fixedColumnWidth = false;
    //this.configuration.isLoading = true;
    this.configuration.rows = 5;
    // ... etc.
    this.columns = [
      { key: 'id', title: 'Id' },
      { key: 'assunto', title: 'Assunto'},
      { key: 'criador', title: 'Criador'},
      { key: 'dataAbertura', title: 'Dt.Abertura'},
      { key: 'statusAtual', title: 'Status'},
      /* { key: 'prioridade', title: 'Prioridade'}, */
      /* { key: 'setor', title: 'Setor'}, */
      /* { key: 'dataFechamento', title: 'Dt.Fechamento'}, */
      { key: 'btn', title: 'Ações'}
    ];

    this.listAll();
  }

  newTicket(){
    this.router.navigate(['/tickets/new']);
  }



  private listAll() {
    this.ticketService.getAll().subscribe({
      next: (response) => {
        this.tickets = response;
        this.titlePage = "Tickets";
      },
      error: (response) => {
        alert(response.error);
      }
    })
  }
}
