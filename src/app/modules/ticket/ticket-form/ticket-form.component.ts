import { SectorService } from './../../../services/sector.service';
import { SetorResponse } from './../../../models/sector/setorResponse.model';
import { ChamadoRequest } from './../../../models/ticket/chamadoRequest.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChamadoResponse, StatusEnum, TipoEnum, PrioridadeEnum } from './../../../models/ticket/chamadoResponse.model';
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

  ticketId: number;
  tituloPagina: string = 'Detalhes do Chamado';
  ticketAssunto: string = 'Assunto chamado';
  ticketForm: FormGroup;
  chamado: ChamadoResponse;
  setores: SetorResponse[];
  message: string;
  success: boolean;
  erros: ErroServidor[];

  //campos visiveis
  boolTitulo: boolean = true;
  boolAviso: boolean = false;

  constructor(
    private ticketService: TicketService,
    private sectorService: SectorService,
    private notification: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const novoTicket = new ChamadoResponse();
    this.validarFormulario(novoTicket);
  }

  ngOnInit(): void {
    this.obterSetores(true);
    this.configurarForm();
  }

  /* get equipamentoId() {
    return this.ticketForm.get('equipamentoId');
  } */

  get setorId() {
    return this.ticketForm.get('setor');
  }

  get tipoId() {
    return this.ticketForm.get('TipoEnum');
  }

  get prioridade() {
    return this.ticketForm.get('PrioridadeEnum');
  }

  get assunto() {
    return this.ticketForm.get('assunto');
  }

  get descricao() {
    return this.ticketForm.get('descricao');
  }

  get operadorId() {
    return this.ticketForm.get('operadorId');
  }

  get solucao() {
    return this.ticketForm.get('solucao');
  }

  get motivo() {
    return this.ticketForm.get('motivo');
  }

  salvar(){
    const chamado = new ChamadoRequest();
    chamado.ticketId = this.ticketId;
    chamado.setorId = this.setorId?.value;
    chamado.tipoId = this.tipoId?.value;
    chamado.prioridade = this.prioridade?.value;
    chamado.assunto = this.assunto?.value;
    chamado.descricao = this.descricao?.value;
    chamado.operadorId = this.operadorId?.value;

    this.ticketService.salvar(chamado).subscribe({
      next: (response) => {
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
        this.notification.showError('Erro ao salvar ticket');
      }
    })
  }

  private configurarForm(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.tituloPagina = 'Editando o Chamado';
      this.ticketId = parseInt(id);
      this.carregarObjeto(this.ticketId);
    }
    else{
      this.router.navigate(['/ticket/open']);
    }
  }

  private obterSetores(ativo: boolean){
    this.sectorService.getAll(ativo).subscribe({
      next: (response) => {
        if(response) {
          this.setores = response;
        }
        else{
          this.setores = [];
          this.notification.showWarning('Nenhum setor encontrado!');
        }
      },
      error: () => {
        this.notification.showError('Erro ao consultar setores');
      }
    })
  }

  private carregarObjeto(id: number){
    this.ticketService.getById(id).subscribe({
      next: (response) => {
        if(response){
          this.chamado = response;
          this.validarFormulario(this.chamado);
        }
        else{
          this.notification.showWarning('Ticket não encontrado');
        }
      },
      error: () => {
        this.notification.showError('Erro ao carregar dados do ticket');
      }
    });
  }

  private validarFormulario(ticket: ChamadoResponse){
    this.ticketForm = new FormGroup({
      dataAbertura: new FormControl(ticket.dataAbertura, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      tipo: new FormControl(ticket.tipo, [ 
        /* Validators.required */
      ]),
      criador: new FormControl(ticket.criador?.nome, [
        /* Validators.required */
      ]),
      setor: new FormControl(ticket.setor?.id, [
        /* Validators.required */
      ]),
      assunto: new FormControl(ticket.assunto, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      descricao: new FormControl(ticket.descricao, [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(200)
      ]),
      status: new FormControl(ticket.status, [
        /* Validators.required */
      ]),
      prioridade: new FormControl(ticket.prioridade, [
        /* Validators.required */
      ]),
      dataFechamento: new FormControl(ticket.dataFechamento, [
        /* Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10) */
      ]),
      solucao: new FormControl(ticket.solucao, [
        /* Validators.required,
        Validators.minLength(15),
        Validators.maxLength(2000) */
      ]),
      operador: new FormControl(ticket.operador?.nome, [
        /* Validators.required */
      ]),
      operadorId: new FormControl(ticket.operador?.id, [
        /* Validators.required */
      ])
    });
  }

  newTicket() {
    this.router.navigate(['/ticket/open']);
  }

  /* goHistoric(){
    this.router.navigate(['tickets/1/historic']);
  }

  goComments(){
    this.router.navigate(['tickets/1/comments']);
  } */

  anexo(ticketId: number){
    this.router.navigate([`/ticket/${ticketId}/anexo`]);
  }

  cancelarTicket(){
    const ticket = new CancelarRequest();
    ticket.ticketId = this.ticketId;
    ticket.motivo = this.solucao?.value;

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
    ticket.ticketId = this.ticketId;
    ticket.solucao = this.solucao?.value;

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
