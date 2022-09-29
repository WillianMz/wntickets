import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErroServidor } from 'src/app/models/erroServidor';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoEquiModel } from 'src/app/models/equipment/tipoEquipModel';
import { EquipamentoService } from 'src/app/services/equipamento.service';

@Component({
    selector: 'app-equip-type-form',
    templateUrl: './equip-type-form.component.html',
    styleUrls: ['./equip-type-form.component.css']
})
export class EquipTypeFormComponent implements OnInit {

    @Input() tipoEquipID: number;
    @Input() navbarVisible: boolean;
    @Input() titleFormVisible: boolean;

    tituloPagina: string = 'Detalhes do tipo de equipamento';
    titleForm: string = 'TipoEquipForm';
    equipType: TipoEquiModel;
    tipoEquipForm: FormGroup;
    message: string;
    success: boolean;
    erros: ErroServidor[];
    boolTitulo: boolean = true;
    boolAviso: boolean = false;

    constructor(
    private equipamentoService: EquipamentoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    ) {
    const tipoEquip = { descricao: '', ativo: true, controlarNumSerial: false };
    this.startForm(tipoEquip);
    }

    get descricao() {
    return this.tipoEquipForm.get('descricao');
    }

    ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
        this.tituloPagina = 'Editando tipo de equipamento';
        this.tipoEquipID = parseInt(id);
        this.loadTipoEquip(this.tipoEquipID);
    }
    else{
        this.tituloPagina = "Novo tipo de equipamento";
    }
    }

    startForm(itipo: TipoEquiModel) {
    this.tipoEquipForm = new FormGroup({
        descricao: new FormControl(itipo.descricao, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
        ]),
        ativo: new FormControl(itipo.ativo, []),
        controlarNumSerial: new FormControl(itipo.controlarNumSerial, [])
    });
    console.log();
    }

    saveTipo(){
    const tipoEquip = {...this.tipoEquipForm.value, id: this.tipoEquipID};
    console.log(tipoEquip);
    this.equipamentoService.saveTipo(tipoEquip).subscribe({
        next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];
        this.showSuccess(this.message);
        this.router.navigate(['/equip-type']);
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


    private loadTipoEquip(idTipoEquip: number){
    this.equipamentoService.getTipoById(idTipoEquip).subscribe(
        (response) => {
        this.equipType = response;
        this.startForm(this.equipType);
        console.log(this.equipType);
        }
    );
    }

    private showSuccess(message: string, title?: string){
    this.toastr.success(message, title);
    }

    private showError(message: string, title?: string){
    this.toastr.error(message, title);
    }

}
