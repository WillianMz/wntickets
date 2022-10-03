import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EquipamentoService } from 'src/app/services/equipamento.service';

@Component({
  selector: 'app-equip-tipo-form',
  templateUrl: './equip-tipo-form.component.html',
  styleUrls: ['./equip-tipo-form.component.css']
})
export class EquipTipoFormComponent implements OnInit {

  /* @Input() tipoEquipID: number; */

  tituloPagina: string = 'Detalhes do tipo de equipamento';
  titleForm: string = 'TipoEquipForm';
  /* equipType: TipoEquiModel;
  tipoEquipForm: FormGroup; */
  message: string;
  success: boolean;
  /* erros: ErroServidor[]; */
  boolTitulo: boolean = true;
  boolAviso: boolean = false;

  constructor(
    private equipamentoService: EquipamentoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

}
