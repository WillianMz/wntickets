import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  // titleForm: string = 'EquipForm';
  // equip: EquipamentoModel;
  // equipForm: FormGroup;
  // message: string;
  // success: boolean;
  // erros: ErroServidor[];

  constructor(
    // private sectorService: EquipamentoService,
    // private activatedRoute: ActivatedRoute,
    // private router: Router,
    // private toastr: ToastrService
    ) {
      // const sector = { Nome: '' };
      // this.startForm(sector);
     }

  ngOnInit(): void {
  }

}
