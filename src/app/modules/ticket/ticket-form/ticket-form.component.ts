import { EquipamentoResponse } from './../../../models/equipment/equipamentoResponse.model';
import { SetorResponse } from './../../../models/sector/setorResponse.model';
import { ChamadoResponse } from './../../../models/ticket/chamadoResponse.model';
import { FormGroup, FormControl } from '@angular/forms';
import { CancelarRequest } from './../../../models/ticket/cancelarRequest.model';
import { ErroServidor } from './../../../models/erroServidor';
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
  tituloPagina: string = 'Editando Chamado';
  message: string;
  success: boolean;
  erros: ErroServidor[];

  ticketForm: FormGroup;
  setores: SetorResponse[];
  equipamentos: EquipamentoResponse[];
  

  constructor(
    private ticketService: TicketService,
    private notification: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const chamado = new ChamadoResponse();
    this.validarFormulario(chamado);
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.ticketID = parseInt(id);
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


  private listarSetores(){

  }

  private listarEquipamentos(){

  }

  private listarOperadores(){

  }

  private listarPrioridades(){

  }

  private validarFormulario(chamado: ChamadoResponse){
    this.ticketForm = new FormGroup({
      id: new FormControl(chamado.id),
      dtAbertura: new FormControl(chamado.dataAbertura),
      criador: new FormControl(chamado.criador),
      setor: new FormControl(chamado.setor),
      assunto: new FormControl(chamado.assunto),
      descricao: new FormControl(chamado.descricao),
      status: new FormControl(chamado.status),
      prioridade: new FormControl(chamado.prioridade),
      dtFechamento: new FormControl(chamado.dataFechamento),
      solucao: new FormControl(chamado.solucao),
      operador: new FormControl(chamado.operador),
      equipamento: new FormControl(chamado.equipamento)
    })
  }
}
