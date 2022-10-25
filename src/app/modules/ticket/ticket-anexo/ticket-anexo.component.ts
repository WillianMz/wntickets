import { AnexoRequest } from './../../../models/ticket/anexoRequest.model';
import { TicketService } from 'src/app/services/ticket.service';
import { ErroServidor } from 'src/app/models/erroServidor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-anexo',
  templateUrl: './ticket-anexo.component.html',
  styleUrls: ['./ticket-anexo.component.css']
})
export class TicketAnexoComponent implements OnInit {

  tituloPagina: string = 'Anexos';

  //campos visiveis
  boolTitulo: boolean = true;
  boolAviso: boolean = false;

  message: string;
  success: boolean;
  erros: ErroServidor[];

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {

  }

   selectAnexo() {

  }

  uploadAnexo() {

  }
  
}
