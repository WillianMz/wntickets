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

  constructor() { }

  ngOnInit(): void {
  }

}
