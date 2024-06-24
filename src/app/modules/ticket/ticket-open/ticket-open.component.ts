import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificarPermissoes } from 'src/app/functions/verificarPermissoes';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SectorService } from 'src/app/services/sector.service';
import { TicketService } from 'src/app/services/ticket.service';
import { EquipamentoResponse } from './../../../models/equipment/equipamentoResponse.model';
import { SetorResponse } from './../../../models/sector/setorResponse.model';
import { ChamadoRequest } from './../../../models/ticket/chamadoRequest.model';
import { UploadService } from './../../../services/upload.service';

@Component({
  selector: 'app-ticket-open',
  templateUrl: './ticket-open.component.html',
  styleUrls: ['./ticket-open.component.css']
})
export class TicketOpenComponent implements OnInit {

  titulo = "Novo chamado";
  chamadoForm: FormGroup;
  setores: SetorResponse[];
  equipamento: EquipamentoResponse;
  informarEquipamento: boolean;
  selecionarSetor: boolean;
  sucesso: boolean;
  mensagem: string;
  anexoForm: any;
  anexoNome: string;
  urlAnexo: string;
  setorId: number;
  equipamentoId: number;
  somenteLeitura: boolean = false;

  constructor(
    private setorService: SectorService,
    private equipamentoService: EquipamentoService,
    private chamadoService: TicketService,
    private notification: NotificationService,
    private uploadService: UploadService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService
  ) { 

    this.activatedRoute.queryParams.subscribe(
      params => {
        this.setorId = parseInt(params.setorId);
        this.equipamentoId = parseInt(params.equipamento);
      }
    );
    const chamado = new ChamadoRequest();
    this.validarFormulario(chamado);
  }

  ngOnInit(): void {

    this.obterSetores();
    this.selecionarSetor = true;
    const chamado = new ChamadoRequest();
    /* chamado.equipamentoId = this.equipamentoId;
    chamado.setorId = this.setorId; */
    this.validarFormulario(chamado);

    /* if(this.setorId){
      this.informarEquipamento = false;
      this.selecionarSetor = true;
      this.obterSetores();

    }
    else {
      if(this.equipamentoId){
        this.informarEquipamento = true;
        this.somenteLeitura = true;
        this.selecionarSetor = false;
        const chamado = new ChamadoRequest();
        chamado.equipamentoId = this.equipamentoId;
        chamado.setorId = this.setorId;
        this.validarFormulario(chamado);
      }
    } */
    
  }

  get inputEquipamento(){
    return this.chamadoForm.get('equipamento');
  }

  get inputSetor(){
    return this.chamadoForm.get('setor');
  }

  get inputAssunto(){
    return this.chamadoForm.get('assunto');
  }

  get inputDescricao(){
    return this.chamadoForm.get('descricao');
  }

  public upload(file: any){
    this.anexoForm = file[0];
    this.anexoNome = file[0].name;
    this.fazerUpload();
  }

  public async salvar(){
    const chamadoRequest = new ChamadoRequest();
    chamadoRequest.descricao = this.inputDescricao?.value;
    chamadoRequest.anexo = this.urlAnexo;
    chamadoRequest.setorId = this.setorId || this.inputSetor?.value;
    chamadoRequest.assunto = this.inputAssunto?.value || 'Chamado para laboratório';

    this.chamadoService.salvar(chamadoRequest).subscribe({
      next: (response) => {
        this.sucesso = response['sucesso'];
        this.mensagem = response['mensagem'];

        if(this.sucesso){
          this.notification.showSuccess(this.mensagem);
          this.router.navigate(['']);
        }
        else{
          this.notification.showWarning(this.mensagem);
        }
      },
      error: () => {
        this.notification.showError('Erro ao abrir chamado');
      }
    });


    /* if(this.setorId){
      chamadoRequest.setorId = this.setorId;
      chamadoRequest.assunto = this.inputAssunto?.value || 'Chamado para laboratório';

      this.chamadoService.salvar(chamadoRequest).subscribe({
        next: (response) => {
          this.sucesso = response['sucesso'];
          this.mensagem = response['mensagem'];
  
          if(this.sucesso){
            this.notification.showSuccess(this.mensagem);
            this.router.navigate(['']);
          }
          else{
            this.notification.showWarning(this.mensagem);
          }
        },
        error: () => {
          this.notification.showError('Erro ao abrir chamado');
        }
      });
    }
    else {
      chamadoRequest.equipamentoId = this.inputEquipamento?.value || this.equipamentoId;
      chamadoRequest.assunto = this.inputAssunto?.value || 'Chamado para equipamento';
    
      console.log(chamadoRequest);

      this.chamadoService.chamadoEquipamento(chamadoRequest).subscribe({
        next: (response) => {
          this.sucesso = response['sucesso'];
          this.mensagem = response['mensagem'];

          if(this.sucesso){
            this.notification.showSuccess(this.mensagem);
            this.router.navigate(['']);
          }
          else{
            this.notification.showWarning(this.mensagem);
          }
        },
        error: () => {
          this.notification.showError('Erro ao abrir chamado');
        }
      }); */
    /* } */
  }

  private fazerUpload(){
    //if(this.anexoForm){
      let formdata = new FormData();
      formdata.append('file', this.anexoForm, this.anexoNome);
  
      this.uploadService.arquivo(formdata).subscribe({
        next: (response) => {
          if(response){
            this.urlAnexo = response['objeto'];
            console.log(this.urlAnexo);
          }
        },
        error: (response) => {
          console.log(response);
        }
      });
    //}
  }

  private obterEquipamento(id: string){
    this.equipamentoService.getById(parseInt(id)).subscribe({
      next: (response) => {
        if(response){
          this.equipamento = response;
          //this.carregarDadosFormulario(this.equipamento);
          //remover depois
          this.notification.showInfo('Equipamento identificado');
        }
        else{
          this.notification.showWarning('Equipamento não identificado');
        }
      },
      error: () => {
        this.notification.showError('Erro ao carregar dados do equipamento');
      }
    })
  }

  private obterSetores(){
    this.setorService.getAll(true).subscribe({
      next: (response) => {
        if(response){
          this.setores = response;
        }
        else{
          this.notification.showInfo('Nenhum setor encontrado');
        }
      },
      error: () => {
        this.notification.showError('Erro ao obter setores');
      }
    })
  }

  private validarFormulario(chamado: ChamadoRequest){
    this.chamadoForm = new FormGroup({
      equipamento: new FormControl(chamado.equipamentoId),
      setor: new FormControl(chamado.setorId, [Validators.required]),
      prioridade: new FormControl(chamado.prioridade),
      assunto: new FormControl(chamado.assunto),
      descricao: new FormControl(chamado.descricao,[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(2000)
      ])
    });


   /* if(this.setorId){
    this.chamadoForm = new FormGroup({
      equipamento: new FormControl(chamado.equipamentoId),
      setor: new FormControl(chamado.setorId, [Validators.required]),
      prioridade: new FormControl(chamado.prioridade),
      assunto: new FormControl(chamado.assunto),
      descricao: new FormControl(chamado.descricao,[
        Validators.required,
        Validators.minLength(35),
        Validators.maxLength(2000)
      ])
    });
   } else {

    if(this.equipamentoId){
     this.chamadoForm = new FormGroup({
       equipamento: new FormControl(chamado.equipamentoId),
       setor: new FormControl(chamado.setorId),
       prioridade: new FormControl(chamado.prioridade),
       assunto: new FormControl(chamado.assunto),
       descricao: new FormControl(chamado.descricao,[
         Validators.required,
         Validators.minLength(10),
         Validators.maxLength(2000)
       ])
     });
    }
    else{
     this.chamadoForm = new FormGroup({
       equipamento: new FormControl(chamado.equipamentoId, [Validators.required]),
       setor: new FormControl(chamado.setorId),
       prioridade: new FormControl(chamado.prioridade),
       assunto: new FormControl(chamado.assunto),
       descricao: new FormControl(chamado.descricao,[
         Validators.required,
         Validators.minLength(10),
         Validators.maxLength(2000)
       ])
     });
    }
   } */
    
   }

  public verificarPermissao(roleFuncionalidade: string[]): boolean{
    const usuarioLogado = this.loginService.usuarioLogado();
    const role = usuarioLogado?.perfil;
    return VerificarPermissoes.temPermissao(roleFuncionalidade, role!);
  }
}
