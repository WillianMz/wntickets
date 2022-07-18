import { Component, OnInit } from '@angular/core';
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
      { key: 'btn', title: 'Ações'}
    ];

    this.listAll();
  }

  newTicket(){
    this.router.navigate(['/ticket/new']);
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
