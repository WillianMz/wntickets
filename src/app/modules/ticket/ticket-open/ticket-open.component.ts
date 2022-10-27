import { UploadService } from './../../../services/upload.service';
import { Router } from '@angular/router';
import { EquipamentoResponse } from './../../../models/equipment/equipamentoResponse.model';
import { SetorResponse } from './../../../models/sector/setorResponse.model';
import { TicketService } from 'src/app/services/ticket.service';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { ChamadoRequest } from './../../../models/ticket/chamadoRequest.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SectorService } from 'src/app/services/sector.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-ticket-open',
  templateUrl: './ticket-open.component.html',
  styleUrls: ['./ticket-open.component.css']
})
export class TicketOpenComponent implements OnInit {

  chamadoForm: FormGroup;
  setores: SetorResponse[];
  equipamento: EquipamentoResponse;
  selecionarSetor: boolean = false;
  selecionarPrioridade: boolean = false;
  sucesso: boolean;
  mensagem: string;
  anexoForm: any;
  anexoNome: string;
  urlAnexo: string;

  constructor(
    private setorService: SectorService,
    private equipamentoService: EquipamentoService,
    private chamadoService: TicketService,
    private notification: NotificationService,
    private uploadService: UploadService,
    private router: Router
  ) { 
    const chamado = new ChamadoRequest();
    this.validarFormulario(chamado);
  }

  ngOnInit(): void {
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

  public identificarEquipamento(){
    this.obterEquipamento(this.inputEquipamento?.value);
    //this.obterSetores();
  }

  public upload(file: any){
    this.anexoForm = file[0];
    this.anexoNome = file[0].name;
    this.obterUrlAnexo();
  }

  private obterUrlAnexo(){
    let formdata = new FormData();
    formdata.append('file', this.anexoForm, this.anexoNome);

    this.uploadService.arquivo(formdata).subscribe({
      next: (response) => {
        if(response){
          this.urlAnexo = response['objeto'];
        }
      },
      error: (response) => {
        console.log(response);
      }
    });  
  }

  public salvar(){
    const chamadoRequest = new ChamadoRequest();
    chamadoRequest.equipamentoId = this.inputEquipamento?.value;
    chamadoRequest.assunto = this.inputAssunto?.value || 'Chamado para equipamento';
    chamadoRequest.descricao = this.inputDescricao?.value;
    chamadoRequest.anexo = this.urlAnexo;

    this.chamadoService.chamadoEquipamento(chamadoRequest).subscribe({
      next: (response) => {
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
        this.notification.showError('Erro');
      }
    });
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
      equipamento: new FormControl(chamado.equipamentoId, [Validators.required]),
      setor: new FormControl(chamado.setorId),
      prioridade: new FormControl(chamado.prioridade),
      assunto: new FormControl(chamado.assunto, [
        /* Validators.required,
        Validators.minLength(15),
        Validators.maxLength(100) */
      ]),
      descricao: new FormControl(chamado.descricao,[
        Validators.required,
        Validators.minLength(35),
        Validators.maxLength(2000)
      ])
    });
  }
}
