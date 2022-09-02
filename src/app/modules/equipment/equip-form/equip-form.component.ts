import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
    const equip = { Nome: '' };
    this.startForm(equip);
    console.log(equip)
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
      this.titleForm = "Novo laboratório";
      this.titleFormVisible = true;
    }
    console.log(id)
  }

  startForm(iequip: EquipamentoModel) {
    this.equipForm = new FormGroup({
      nome: new FormControl(iequip.Nome, [
/*         Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40) */
      ])
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
        /* this.showSuccess(this.message); */
        this.router.navigate(['/labs']);
      },
      error: (response) => {
        console.log(response);
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        /* this.showError(this.message, 'Ocorreu um erro!'); */
        console.log(this.success);
        console.log(this.message);
        console.log(this.erros);
      }
    });
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
