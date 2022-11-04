import { ChamadoRequest } from './../../../models/ticket/chamadoRequest.model';
import { CriadorResponse } from './../../../models/ticket/criadorResponse.model';
import { SectorService } from './../../../services/sector.service';
import { PessoaService } from './../../../services/pessoa.service';
import { OperadorResponse } from './../../../models/ticket/operadorResponse.model';
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
  erros: ErroServidor[];

  ticketForm: FormGroup;
  chamado: ChamadoResponse;
  setores: SetorResponse[];
  equipamentos: EquipamentoResponse[];
  operadores: OperadorResponse[];
  chamadoId: number;
  equipamentoId: number;
  criador: CriadorResponse;
  sucesso: boolean;
  mensagem: string;
  bloquearEdicao: boolean = false;

  constructor(
    private ticketService: TicketService,
    private pessoaService: PessoaService,
    private setorService: SectorService,
    private notification: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const chamado = new ChamadoResponse();
    this.validarFormulario(chamado);
  }

  ngOnInit(): void {
    this.listarSetores(true);
    this.listarOperadores(true);
    this.configurarForm();
  }

  get setor(){
    return this.ticketForm.get('setor');
  }

  get operador(){
    return this.ticketForm.get('operador');
  }

  get prioridade(){
    return this.ticketForm.get('prioridade');
  }

  get assunto(){
    return this.ticketForm.get('assunto');
  }

  get descricao(){
    return this.ticketForm.get('descricao');
  }

  public salvar(){
    const chamado = new ChamadoRequest();
    chamado.ticketId = this.chamadoId;
    chamado.equipamentoId = this.equipamentoId || 0;
    chamado.setorId = this.setor?.value  || 0;
    chamado.prioridade = this.prioridade?.value;
    chamado.assunto = this.assunto?.value;
    chamado.descricao = this.descricao?.value;
    chamado.operadorId = this.operador?.value  || 0;

    console.log(chamado);

    this.ticketService.salvar(chamado).subscribe({
      next: (response) => {
        if(response){
          this.sucesso = response['sucesso'];
          this.mensagem = response['mensagem'];

          if(this.sucesso){
            this.notification.showSuccess(this.mensagem);
            this.router.navigate(['/ticket']);
          }
          else{
            this.notification.showWarning(this.mensagem);
          }
        }
      },
      error: () => {
        this.notification.showError('Erro ao salvar chamado!');
      }
    })
  }

  /* cancelarTicket(){
    const ticket = new CancelarRequest();
    ticket.ticketId = this.ticketId;
    ticket.motivo = this.solucao?.value;

    this.ticketService.cancelar(ticket).subscribe({
      next: (response) =>{
        this.sucesso = response['sucesso'];
        this.mensagem = response['mensagem'];

        if(this.sucesso){
          this.notification.showSuccess(this.mensagem);
          this.router.navigate(['/ticket']);
        }
        else{
          this.notification.showWarning(this.mensagem);
        }
      },
      error: () => {
        this.notification.showError('Erro ao cancelar o chamado');
      }
    });
  } */

  /* finalizarTicket(){
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
  } */

  private configurarForm(){
    
    const url = document.URL;
    console.log(url);
    const newURL = new URL(url);
    const host = newURL.hostname;
    console.log(host);
    const path = newURL.pathname;
    console.log(path);

    //pega o id na URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.chamadoId = parseInt(id);
      this.carregarChamado(this.chamadoId);
    }
  }

  private listarSetores(ativo: boolean){
    this.setorService.getAll(ativo).subscribe({
      next: (response) => {
        if(response){
          this.setores = response;
        }
      },
      error: () => {
        console.log('Erro ao consultar setores');
      }
    })
  }

  private listarOperadores(ativo: boolean){
    this.pessoaService.getOperadores(ativo).subscribe({
      next: (response) => {
        if(response){
          this.operadores = response;
        }
      },
      error: () => {
        console.log('Erro ao obter operadores');
      }
    })
  }

  private carregarChamado(id: number){
    this.ticketService.getById(id).subscribe({
      next: (response) => {
        if(response){
          this.chamado = response;
          this.criador = this.chamado.criador;
          this.chamadoId = this.chamado.id!;
          this.equipamentoId = this.chamado.equipamentoId!;
          console.log(this.chamado);
          this.validarFormulario(this.chamado);
        }
      }
    })
  }

  private validarFormulario(chamado: ChamadoResponse){
    this.ticketForm = new FormGroup({
      id: new FormControl(chamado.id),
      dtAbertura: new FormControl(chamado.dataAbertura),
      criador: new FormControl(chamado.criador?.nome),
      setor: new FormControl(chamado.setor?.id),
      assunto: new FormControl(chamado.assunto),
      descricao: new FormControl(chamado.descricao),
      status: new FormControl(chamado.status),
      prioridade: new FormControl(chamado.prioridade),
      dtFechamento: new FormControl(chamado.dataFechamento),
      solucao: new FormControl(chamado.solucao),
      operador: new FormControl(chamado.operador?.id),
      equipamento: new FormControl(`${chamado.equipamentoId}-${chamado.equipamentoNome}`)
    });
  }
}
