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
  exibirSectors: boolean = true;

  constructor(
    private sectorService: SectorService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    let category = {
      nome: '',
      setorId: 0
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
    let categ: Icategory;

    if(this.categoryId){
      categ = {
        id: this.categoryId,
        nome: this.nome?.value,
        setorId: this.setor?.value
      }
    }
    else {
      categ = {
        id: this.categoryId,
        nome: this.nome?.value,
        setorId: this.sectorId
      }
    }

    this.save(categ);
  }

  public save(category: Icategory) {
    this.categoryService.save(category).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];

        if(this.success == true){
          this.showSuccess(this.message);
          this.router.navigate(['/sectors/categories'],  {queryParams: { sector: category.setorId}});
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

  private startForm(category: Icategory) {
    this.categForm = new FormGroup({
      nome: new FormControl(category.nome, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ]),
      setorId: new FormControl(category.setorId, [
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
