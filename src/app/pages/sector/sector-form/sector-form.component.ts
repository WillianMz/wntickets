import { SectorService } from 'src/app/services/sector.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Isector } from 'src/app/models/isector';
import { ActivatedRoute, Router } from '@angular/router';

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
  sector: Isector;
  sectorForm: FormGroup;

  constructor(
    private sectorService: SectorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const sector = {
      nome: '',
    };
    this.startForm(sector);
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
      this.titleForm = "Novo setor";
      this.titleFormVisible = true;
    }
  }

  startForm(isector: Isector) {
    this.sectorForm = new FormGroup({
      nome: new FormControl(isector.nome, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ])
    });
  }

  save(){
    const sector = {...this.sectorForm.value, id: this.sectorID};
    console.log(sector);
    this.sectorService.save(sector).subscribe({
      next: (response) => {
        this.router.navigate(['/sectors']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private loadSector(idSector: number){
    this.sectorService.getById(idSector).subscribe(
      (response) => {
        this.sector = response;
        this.startForm(this.sector);
      }
    );
  }

}
