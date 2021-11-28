import { CategoryService } from './../../../services/category.service';
import { Icategory } from './../../../models/icategory';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Icategory[];
  category: Icategory;
  sectorId: number;
  success: boolean;
  message: string;
  modalRef?: BsModalRef;
  pag : number = 1 ;
  contador : number = 5;

  constructor(
    private categoryService: CategoryService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
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

}
