import { AnexoRequest } from './../../../models/ticket/anexoRequest.model';
import { DownloadService } from './../../../services/download.service';
import { FinalizarRequest } from './../../../models/ticket/finalizarRequest.model';
import { CancelarRequest } from './../../../models/ticket/cancelarRequest.model';
import { ChamadoRequest } from './../../../models/ticket/chamadoRequest.model';
import { CriadorResponse } from '../../../models/pessoa/criadorResponse.model';
import { SectorService } from './../../../services/sector.service';
import { PessoaService } from './../../../services/pessoa.service';
import { OperadorResponse } from './../../../models/ticket/operadorResponse.model';
import { SetorResponse } from './../../../models/sector/setorResponse.model';
import { ChamadoResponse } from './../../../models/ticket/chamadoResponse.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from './../../../services/notification.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit, OnDestroy  {

  //@Input() ticketID: number;
  @Input() chamadoId: number;
  @Input() naoExibir: boolean;
  @Input() bloquearEdicao: boolean = true;

  //Armazena assinatura do Observable
  chamadoSub: Subscription;

  tituloPagina: string = 'Detalhes do Chamado';
  //erros: ErroServidor[];
  ticketForm: FormGroup;
  cancelarForm: FormGroup;
  solucaoForm: FormGroup;
  chamado: ChamadoResponse;
  setores: SetorResponse[];
  //equipamentos: EquipamentoResponse[];
  operadores: OperadorResponse[];
  equipamentoId: number;
  criador: CriadorResponse;
  sucesso: boolean;
  mensagem: string;
  status: string;
  cancelarDialog: boolean = false;
  finalizarDialog: boolean = false;
  anexoForm: any;
  anexoNome: string;
  urlAnexo: string;
  acaoAtual: string;
  permitirAnexarArquivo: boolean;

  constructor(
    private ticketService: TicketService,
    private pessoaService: PessoaService,
    private setorService: SectorService,
    private notification: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private downloadService: DownloadService,
    private uploadService: UploadService
  ) {
    const chamado = new ChamadoResponse();
    const finalizar = new FinalizarRequest();
    const cancelar = new CancelarRequest();
    this.validarFormulario(chamado);
    this.validarFormSolucao(finalizar);
    this.validarFormularioCancelar(cancelar);
  }

  ngOnInit(): void {
    this.listarSetores(true);
    this.listarOperadores(true);
    
    const path = this.activatedRoute.snapshot.routeConfig?.path;
    if(path?.includes('edit')){
      this.acaoAtual = 'editar';
    }
    else if(path?.includes('view')){
      this.acaoAtual = 'visualizar';
    }
    
    //pega o id na URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.chamadoId = parseInt(id);
      this.carregarChamado(this.chamadoId);
    }
    
    if(this.chamadoId){
      console.log('aqui: ' + this.chamadoId);
      this.carregarChamado(this.chamadoId);
    }

    //this.configurarForm();
  }

  ngOnDestroy(): void {
    if(this.chamadoSub){
      this.chamadoSub.unsubscribe;
    }
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

  get motivoCancelamento(){
    return this.cancelarForm.get('motivoCancelamento');
  }

  get solucao(){
    return this.solucaoForm.get('solucaoAplicada');
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
    });
  }

  public cancelar(){
    const cancelarRequest = new CancelarRequest();
    cancelarRequest.ticketId = this.chamadoId;
    cancelarRequest.motivo = this.motivoCancelamento?.value;

    this.confirmationService.confirm({
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      message: 'Confirma o cancelamento deste chamado?',
      accept: () => {
        this.chamadoSub = this.ticketService.cancelar(cancelarRequest).subscribe({
          next: (response) => {
            if(response){
              this.sucesso = response['sucesso'];
              this.mensagem = response['mensagem'];
              if(this.sucesso){
                this.notification.showSuccess(this.mensagem, 'Cancelamento de Chamado');
                this.carregarChamado(this.chamadoId);
              }
              else{
                this.notification.showWarning(this.mensagem,'Cancelamento de chamado');
              }
            }
            this.cancelarDialog = false;
            this.cancelarForm.reset();
          },
          error: () => {
            this.notification.showError('Erro ao salvar chamado!');
          }
        });
      }
    });
  }

  public finalizar(){
    const finalizar = new FinalizarRequest();
    finalizar.ticketId = this.chamadoId;
    finalizar.solucao = this.solucao?.value;

    this.confirmationService.confirm({
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      message: 'Confirma a finalização do chamado?',
      accept: () => {
        this.chamadoSub = this.ticketService.finalizar(finalizar).subscribe({
          next: (response) => {
            if(response){
              this.sucesso = response['sucesso'];
              this.mensagem = response['mensagem'];
              if(this.sucesso){
                this.notification.showSuccess(this.mensagem, 'Finalizar chamado');
                this.carregarChamado(this.chamadoId);
                this.solucaoForm.reset();
              }
              else{
                this.notification.showWarning(this.mensagem,'Finalizar chamado');
              }
            }
            
            this.finalizarDialog = false;
            this.solucaoForm.reset();
          },
          error: () => {
            this.notification.showError('Erro ao salvar chamado!');
          }
        });
      }
    });
  }

  public download(url: string, nome: string){
    this.downloadService.download(url).subscribe({
      next: (response) => {
        this.downloadService.handleFile(response, nome);
      }
    });
  }

  public anexarArquivo(file: any){
    this.anexoForm = file[0];
    this.anexoNome = file[0].name;
    this.fazerUpload();
  }

  private fazerUpload(){
    let formdata = new FormData();
    formdata.append('file', this.anexoForm, this.anexoNome);
    this.uploadService.arquivo(formdata).subscribe({
      next: (response) => {
        if(response){
          this.mensagem = response['mensagem'];
          this.sucesso = response['sucesso'];
          if(this.sucesso){
            this.urlAnexo = response['objeto'];
            console.log(this.urlAnexo);
            this.adicionarAnexo();
          }
        }
      },
      error: () => {
        this.notification.showError('Não foi possível fazer o upload do anexo');
      }
    });
  }

  public adicionarAnexo(){
    const anexoRequest = new AnexoRequest();
    anexoRequest.ticketid = this.chamadoId;
    anexoRequest.url = this.urlAnexo;
    anexoRequest.descricao = this.anexoNome;
    this.ticketService.anexarArquivo(anexoRequest).subscribe({
      next: (response) =>{
        this.mensagem = response['mensagem'];
        this.sucesso = response['sucesso'];
        if(this.sucesso){
          this.notification.showSuccess(this.mensagem);
          this.carregarChamado(this.chamadoId);
        }
        else{
          this.notification.showInfo(this.mensagem);
        }
      },
      error: () => {
        this.notification.showError('Não foi possível adicionar o anexo!');
      }
    });
  }

  public removerAnexo(id: number ){
    this.ticketService.removerAnexo(id).subscribe({
      next: (response) => {
        if(response){
          this.mensagem = response['mensagem'];
          this.sucesso = response['sucesso'];
          if(this.sucesso){
            this.notification.showSuccess(this.mensagem);
            this.carregarChamado(this.chamadoId);
          }
          else{
            this.notification.showInfo(this.mensagem);
          }
        }
        else{
          this.notification.showWarning('Tente novamente!');
        }
      },
      error: () => {
        this.notification.showError('Ocorreu um erro!');
      }
    });
  }

  private configurarForm(){
    if(this.acaoAtual == 'editar'){
      this.tituloPagina = 'Editando chamado';
      this.permitirAnexarArquivo = true;

      if(this.status == 'Novo'){
        this.bloquearEdicao = false;
      } 
      
      if(this.status == 'Pendente'){
        this.bloquearEdicao = false;
      }
      
      if(this.status == 'Cancelado'){
        this.bloquearEdicao == true;
      }
  
      if(this.status == 'Finalizado'){
        this.bloquearEdicao == true;
      }
    }
    
    if(this.acaoAtual == 'visualizar'){
      this.tituloPagina = 'Detalhes chamado';
      this.bloquearEdicao = true;
      this.permitirAnexarArquivo = false;
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
          console.log(response);
          this.chamado = response;
          this.criador = this.chamado.criador;
          this.chamadoId = this.chamado.id!;
          this.equipamentoId = this.chamado.equipamentoId!;
          this.status = this.chamado.status!;
          this.validarFormulario(this.chamado);
          this.configurarForm();
        }
        else{
          this.notification.showInfo('Chamado não encontrado!');
          this.router.navigate(['/ticket']);
        }
      },
      error: () => {
        this.notification.showError('Não foi possível carregar os dados do chamado!');
      }
    });
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
      equipamento: new FormControl(`${chamado.equipamentoId}-${chamado.equipamentoNome}`),
      finalizador: new FormControl(chamado.finalizador?.nome)
    });
  }

  private validarFormularioCancelar(cancelar: CancelarRequest){
    this.cancelarForm = new FormGroup({
      motivoCancelamento: new FormControl(cancelar.motivo, [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }

  private validarFormSolucao(solucao: FinalizarRequest){
    this.solucaoForm = new FormGroup({
      solucaoAplicada: new FormControl(solucao.solucao, [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }
}
