import { SetorModel } from './../../../models/sector/setorModel';
import { CategoriaModel } from './../../../models/sector/categoriaModel';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErroServidor } from 'src/app/models/erroServidor';
import { SectorService } from 'src/app/services/sector.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  category: CategoriaModel;
  sectors: SetorModel[];
  categForm: FormGroup;
  message: string;
  success: boolean;
  erros: ErroServidor[];
  exibirSectors: boolean = true;

  constructor(
    private sectorService: SectorService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    let category = {
      Nome: '',
      SetorId: 0
    };

    this.startForm(category);
   }

  get nome() {
    return this.categForm.get('nome');
  }

  get setor(){
    return this.categForm.get('setorId');
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.categoryId = parseInt(id);
    }
    else {
      this.activatedRoute.queryParams.subscribe(
        params => {
          this.sectorId = parseInt(params.sector);
        }
      );
    }

    if(this.categoryId){
      this.listSectors();
      this.titleForm = "Editando categoria";
      this.loadCategory(this.categoryId);
    }
    else {
      this.titleForm = "Nova categoria";
      this.exibirSectors = false;
    }
  }

  public createCategory(){
    let categ: CategoriaModel;

    if(this.categoryId){
      categ = {
        Id: this.categoryId,
        Nome: this.nome?.value,
        SetorId: this.setor?.value
      }
    }
    else {
      categ = {
        Id: this.categoryId,
        Nome: this.nome?.value,
        SetorId: this.sectorId
      }
    }

    this.save(categ);
  }

  public save(category: CategoriaModel) {
    this.categoryService.save(category).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];

        if(this.success == true){
          this.showSuccess(this.message);
          this.router.navigate(['/sectors/categories'],  {queryParams: { sector: category.SetorId}});
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
    this.categoryService.getById(categId).subscribe({
      next: (response) => {
        this.category = response;
        console.log((response));
        this.startForm(this.category);
      },
      error: (response) => {
        window.alert(response);
      }
    });
  }

  private listSectors(){
      this.sectorService.getAll().subscribe({
      next: (response) => {
        this.sectors = response;
      }
    });
  }

  private startForm(category: CategoriaModel) {
    this.categForm = new FormGroup({
      nome: new FormControl(category.Nome, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      setorId: new FormControl(category.SetorId, [
        Validators.required
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
