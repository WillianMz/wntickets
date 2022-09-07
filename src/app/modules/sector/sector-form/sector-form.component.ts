import { SetorModel } from './../../../models/sector/setorModel';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErroServidor } from 'src/app/models/erroServidor';
import { SectorService } from 'src/app/services/sector.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sector-form',
  templateUrl: './sector-form.component.html',
  styleUrls: ['./sector-form.component.css']
})
export class SectorFormComponent implements OnInit {

  @Input() sectorID: number;
  @Input() navbarVisible: boolean;
  @Input() titleFormVisible: boolean;

  titleForm: string = 'SetorForm';
  sector: SetorModel;
  sectorForm: FormGroup;
  message: string;
  success: boolean;
  erros: ErroServidor[];

  constructor(
    private sectorService: SectorService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    const sector = { nome: '' };
    this.startForm(sector);
    //console.log(sector)
   }

  get nome() {
    return this.sectorForm.get('nome');
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.sectorID = parseInt(id);
      this.loadSector(this.sectorID);
    }
    else{
      this.titleForm = "Novo laboratório";
      this.titleFormVisible = true;
    }
  }

  startForm(isector: SetorModel) {
    this.sectorForm = new FormGroup({
      nome: new FormControl(isector.nome, [
     /*    Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40) */
      ]),
      ativo: new FormControl(isector.ativo, [])
    });
    console.log();
  }

  save(){
    const sector = {...this.sectorForm.value, id: this.sectorID};
    console.log(sector);
    this.sectorService.save(sector).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];
        this.showSuccess(this.message);
        this.router.navigate(['/labs']);
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

  private loadSector(idSector: number){
    this.sectorService.getById(idSector).subscribe(
      (response) => {
        this.sector = response;
        this.startForm(this.sector);
        console.log(this.sector);
      }
    );
  }
}
