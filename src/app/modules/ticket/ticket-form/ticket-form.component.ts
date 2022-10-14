import { CancelarRequest } from './../../../models/ticket/cancelarRequest.model';
import { ErroServidor } from './../../../models/erroServidor';
import { ChamadoRequest } from './../../../models/ticket/chamadoRequest.model';
import { NotificationService } from './../../../services/notification.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FinalizarRequest } from 'src/app/models/ticket/finalizarRequest.model';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {

  @Input() ticketID: number;
  tituloPagina: string = 'Detalhes do Chamado';
  message: string;
  success: boolean;
  erros: ErroServidor[];

  constructor(
    private ticketService: TicketService,
    private notification: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.ticketID = parseInt(id);
      this.tituloPagina = 'Detalhes do Chamado';
      }
      else{
        //
      }
  }

  newTicket() {
    this.router.navigate(['/ticket/open']);
  }

  goHistoric(){
    this.router.navigate(['tickets/1/historic']);
  }

  /* goComments(){
    this.router.navigate(['tickets/1/comments']);
  } */

  goAttachments(){
    this.router.navigate(['tickets/1/attachments']);
  }

  cancelarTicket(){
    const ticket = new CancelarRequest();
    ticket.ticketId = this.ticketID;

    this.ticketService.cancelar(ticket).subscribe({
      next: (response) =>{
        this.success = response['sucesso'];
        this.message = response['mensagem'];

        if(this.success){
          this.notification.showSuccess(this.message);
          this.router.navigate(['/ticket']);
        }
        else{
          this.notification.showWarning(this.message);
        }
      },
      error: () => {
        this.notification.showError('Erro ao cancelar o chamado');
      }
    });
  }

  finalizarTicket(){
    const ticket = new FinalizarRequest();
    ticket.ticketId = this.ticketID;

    this.ticketService.finalizar(ticket).subscribe({
      next: (response) =>{
        this.success = response['sucesso'];
        this.message = response['mensagem'];

        if(this.success){
          this.notification.showSuccess(this.message);
          this.router.navigate(['/ticket']);
        }
        else{
          this.notification.showWarning(this.message);
        }
      },
      error: () => {
        this.notification.showError('Erro ao finalizar o chamado');
      }
    });
  }

}
