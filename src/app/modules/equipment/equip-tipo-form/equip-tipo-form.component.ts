import { TipoEquipamentoRequest } from './../../../models/equipment/tipoEquipamentoRequest.model';
import { TipoEquipamentoResponse } from './../../../models/equipment/tipoEquipamentoResponse.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipamentoService } from 'src/app/services/equipamento.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-equip-tipo-form',
  templateUrl: './equip-tipo-form.component.html',
  styleUrls: ['./equip-tipo-form.component.css'],
})
export class EquipTipoFormComponent implements OnInit {

  tituloPagina: string = 'Tipo de Equipamento';
  tipoForm: FormGroup;
  tipoEquipamento: TipoEquipamentoResponse;
  tipoEquipamentoID: number;
  success: boolean;
  message: string;

  constructor(
    private equipamentoService: EquipamentoService,
    private notification: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const equip = new TipoEquipamentoResponse();
    equip.ativo = true;
    this.validarFormulario(equip);
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.tipoEquipamentoID = parseInt(id);
      this.carregarObjeto(this.tipoEquipamentoID);
      this.tituloPagina = 'Editando registro';
    }
    else{
      this.tituloPagina = 'Novo tipo de equipamento';
    }
  }

  get controlaSerial(){
    return this.tipoForm.get('controla_serial');
  }

  get descricao(){
    return this.tipoForm.get('descricao');
  }

  get ativo(){
    return this.tipoForm.get('ativo');
  }

  public cancelar(){
    this.router.navigate(['/equipment/tipo']);
  }

  public salvar(){
    const tipoEquipamento = new TipoEquipamentoRequest();
    tipoEquipamento.id = this.tipoEquipamentoID;
    tipoEquipamento.descricao = this.descricao?.value;
    tipoEquipamento.ativo = this.ativo?.value;
    tipoEquipamento.controlarNumSerial = this.controlaSerial?.value;

    this.equipamentoService.salvarTipo(tipoEquipamento).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];
        if(this.success == true){
          this.notification.showSuccess(this.message);
          this.router.navigate(['/equipment/tipo']);
        }
        else{
          this.notification.showWarning(this.message);
        }
      },
      error: () => {
        this.notification.showError('Erro ao salvar tipo');
      }
    })
  }

  private carregarObjeto(id: number){
    this.equipamentoService.getTipoById(id).subscribe({
      next: (response) => {
        this.tipoEquipamento = response;
        if(this.tipoEquipamento != null){
          this.validarFormulario(this.tipoEquipamento);
        }
        else{
          this.notification.showInfo('Registro não encontrado!');
        }
      },
      error: () => {
        this.notification.showError('Erro ao tentar carregar o registro');
      }
    })
  }

  private validarFormulario(tipo: TipoEquipamentoResponse) {
    this.tipoForm = new FormGroup({
      descricao: new FormControl(tipo.descricao, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
      ]),
      ativo: new FormControl(tipo.ativo),
      controlarNumSerial: new FormControl(tipo.controlarNumSerial)
    });
  }
}
