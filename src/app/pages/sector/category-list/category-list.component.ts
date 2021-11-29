import { SectorService } from 'src/app/services/sector.service';
import { Isector } from 'src/app/models/isector';
import { CategoryService } from './../../../services/category.service';
import { Icategory } from './../../../models/icategory';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  titlePagina: string = 'Categorias';
  idSector: number;
  sector: Isector;
  categories: Icategory[];
  category: Icategory;
  sectorId: number;
  success: boolean;
  message: string;
  modalRef?: BsModalRef;
  pag : number = 1 ;
  contador : number = 5;

  constructor(
    private sectorService: SectorService,
    private categoryService: CategoryService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        console.log(params);
        this.filterBySector(params.sector);
        this.idSector = parseInt(params.sector, 10);
        console.log(this.idSector);
      }
    );

    if(this.idSector){
      this.filterBySector(this.idSector);
    }
    else{
      this.listAll();
    }
  }

  listAll(){
    this.categoryService.getAll().subscribe(
      (respose) => {
        this.categories = respose;
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private filterBySector(idSector: number){
    console.log('filtro por setor');
    this.categoryService.getBySector(idSector).subscribe(
      (response) => {
        this.categories = response;
        console.log(this.categories);
        this.titlePagina = 'Categorias do setor';
      }
    );
  }

}
