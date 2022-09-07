import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EquipamentoModel } from 'src/app/models/equipment/equipamentoModel';
import { ErroServidor } from 'src/app/models/erroServidor';
import { EquipamentoService } from 'src/app/services/equipamento.service';

@Component({
  selector: 'app-equip-form',
  templateUrl: './equip-form.component.html',
  styleUrls: ['./equip-form.component.css']
})
export class EquipFormComponent implements OnInit {

  @Input() equipID: number;
  @Input() navbarVisible: boolean;
  @Input() titleFormVisible: boolean;

  titleForm: string = 'EquipForm';
  equip: EquipamentoModel;
  equipForm: FormGroup;
  message: string;
  success: boolean;
  erros: ErroServidor[];

  constructor(
    private equipamentoService: EquipamentoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    const equip = { nome: '' };
    this.startForm(equip);
    //console.log(equip)
     }

     get nome() {
      return this.equipForm.get('nome');
    }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.equipID = parseInt(id);
      this.loadEquip(this.equipID);
    }
    else{
      this.titleForm = "Novo Equipamento";
      this.titleFormVisible = true;
    }
  }

  startForm(iequip: EquipamentoModel) {
    this.equipForm = new FormGroup({
      nome: new FormControl(iequip.nome, [
      /*   Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40) */
      ]),
      ativo: new FormControl(iequip.ativo, []),
      codInterno: new FormControl(iequip.codInterno, []),
      tipoId: new FormControl(iequip.tipoId, []),
      tipo: new FormControl(iequip.tipo, []),
      setorId: new FormControl(iequip.setorId, []),
      setor: new FormControl(iequip.setor, []),
      descricao: new FormControl(iequip.descricao, []),
      fabricante: new FormControl(iequip.fabricante, []),
      marca: new FormControl(iequip.marca, []),
      modelo: new FormControl(iequip.modelo, []),
      numSerial: new FormControl(iequip.numSerial, []),
      anoFabricacao: new FormControl(iequip.anoFabricacao, []),
      dataCompra: new FormControl(iequip.dataCompra, []),
      precoCompra: new FormControl(iequip.precoCompra, []),
      anotacoes: new FormControl(iequip.anotacoes, []),
      foto: new FormControl(iequip.foto, []),
      motivoBaixa: new FormControl(iequip.motivoBaixa, [])
    });
    console.log();
  }

  save(){
    const equip = {...this.equipForm.value, id: this.equipID};
    console.log(equip);
    this.equipamentoService.save(equip).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];
        this.showSuccess(this.message);
        this.router.navigate(['/equipment']);
      },
      error: (response) => {
        console.log(response);
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.showError(this.message, 'Ocorreu um erro!');
        console.log(this.success);
        console.log(this.message);
        console.log(this.erros);
      }
    });
  }

  private showSuccess(message: string, title?: string){
    this.toastr.success(message, title);
  }

  private showError(message: string, title?: string){
    this.toastr.error(message, title);
  }

  private loadEquip(idEquip: number){
    this.equipamentoService.getById(idEquip).subscribe(
      (response) => {
        this.equip = response;
        this.startForm(this.equip);
        console.log(this.equip);
      }
    );
  }
}
