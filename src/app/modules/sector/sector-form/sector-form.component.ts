import { SetorRequest } from './../../../models/sector/setorRequest.model';
import { NotificationService } from './../../../services/notification.service';
import { SetorResponse } from './../../../models/sector/setorResponse.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErroServidor } from 'src/app/models/erroServidor';
import { SectorService } from 'src/app/services/sector.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sector-form',
  templateUrl: './sector-form.component.html',
  styleUrls: ['./sector-form.component.css']
})
export class SectorFormComponent implements OnInit {

  @Input() sectorID: number;
  tituloPagina: string = 'Detalhes do laboratório';
  setor: SetorResponse;
  sectorForm: FormGroup;
  message: string;
  success: boolean;
  erros: ErroServidor[];

  constructor(
    private sectorService: SectorService,
    private notification: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const setor = new SetorResponse();
    setor.ativo = true;
    this.validarFormulario(setor);
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.sectorID = parseInt(id);
      this.carregarObjeto(this.sectorID);
      this.tituloPagina = 'Editando registro';
    }
    else{
      this.tituloPagina = 'Novo laboratório';
    }
  }

  get nome() {
    return this.sectorForm.get('nome');
  }

  get ativo() {
    return this.sectorForm.get('ativo');
  }

  public salvar(){
    const setor = new SetorRequest();
    setor.id = this.sectorID;
    setor.nome = this.nome?.value;
    setor.ativo = this.ativo?.value;

    this.sectorService.salvar(setor).subscribe({
      next: (response) =>{
        this.success = response['sucesso'];
        this.message = response['mensagem'];

        if(this.success){
          this.notification.showSuccess(this.message);
          this.router.navigate(['/labs']);
        }
        else{
          this.notification.showWarning(this.message);
        }
      },
      error: () => {
        this.notification.showError('Erro ao salvar laboratório');
      }
    });
  }

  private validarFormulario(setor: SetorResponse){
    this.sectorForm = new FormGroup({
      nome: new FormControl(setor.nome, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      ativo: new FormControl(setor.ativo)
    });
  }

  private carregarObjeto(id: number){
    this.sectorService.getById(id).subscribe({
      next: (response) => {
        this.setor = response;
        
        if(this.setor != null){
          this.validarFormulario(this.setor);
        }
        else{
          this.notification.showWarning('Registro não encontrado!');
        }
      },
      error: () => {
        this.notification.showError('Erro ao carregar o registro');
      }
    });
  }
}