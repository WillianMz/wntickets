import { Iticket } from './../../../models/iticket';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  tickets: Iticket[];
  public configuration: Config;
  public columns: Columns[];

  constructor(
    private router: Router
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
      { key: 'dataAbertura', title: 'Dt.Abertura'},
      { key: 'criador', title: 'Criador'},
      { key: 'assunto', title: 'Assunto'},
      { key: 'status', title: 'Status'},
      { key: 'prioridade', title: 'Prioridade'},
      { key: 'dataFechamento', title: 'Dt.Fechamento'}
    ];
  }

  newTicket(){
    this.router.navigate(['/tickets/new']);
  }
}
