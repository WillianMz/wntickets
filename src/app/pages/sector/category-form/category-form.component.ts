import { SectorService } from './../../../services/sector.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { ErroServidor } from './../../../models/erroServidor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Icategory } from './../../../models/icategory';
import { Component, Input, OnInit } from '@angular/core';
import { Isector } from 'src/app/models/isector';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  @Input() sectorId: number;
  @Input() categoryId: number;
  @Input() titleFormVisible: boolean;
  @Input() navbarVisible: boolean;

  titleForm: string;
  category: Icategory;
  sectors: Isector[];
  categForm: FormGroup;
  message: string;
  success: boolean;
  erros: ErroServidor[];
  exibirSector: boolean = true;

  constructor(
    private sectorService: SectorService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    let category = {
      nome: '',
      sectorID: 0
    };

    this.startForm(category);
   }

  get nome() {
    return this.categForm.get('nome');
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.sectorId = parseInt(params.sector);
        this.categoryId = parseInt(params.category);
      }
    );

    if(this.categoryId){
      this.listSectors();
      this.titleForm = "Editando registro";
      this.loadCategory(this.categoryId);
    }
    else {
      this.titleForm = "Nova categoria";
    }

  }

  public save() {
    let categ: Icategory;
    categ = {...this.categForm.value, setorID: this.sectorId};
    console.log(categ);

    this.categoryService.save(categ).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];

        if(this.success == true){
          this.showSuccess(this.message, 'Nova categoria');
          this.router.navigate(['/sectors/categories'],  {queryParams: { sector: this.sectorId}});
        }
        else {
          this.showError(this.message);
        }
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];

        this.showError(this.message, 'Ocorreu um erro!');
      }
    });
  }

  private loadCategory(categId: number) {
    setTimeout(() => {
      this.categoryService.getById(categId).subscribe({
        next: (response) => {
          this.success = response['sucesso'];
          this.message = response['mensagem'];

          if(this.success == true){
            this.category = response['objeto'];
            console.log(this.category);
            this.startForm(this.category);
          }
        }
      })
    }, 1000);
  }

  private listSectors(){
    //setTimeout(() => {
      this.sectorService.getAll().subscribe({
        next: (response) => {
          this.sectors = response['objeto'];
        }
      })
    //}, 1000);
  }

  private startForm(category: Icategory) {
    this.categForm = new FormGroup({
      nome: new FormControl(category.nome, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ])
    });
  }

  private showSuccess(message: string, title?: string){
    this.toastr.success(message, title);
  }

  private showError(message: string, title?: string){
    this.toastr.error(message, title);
  }
}
