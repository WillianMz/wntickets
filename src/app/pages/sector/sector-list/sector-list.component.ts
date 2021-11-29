import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Isector } from 'src/app/models/isector';
import { SectorService } from 'src/app/services/sector.service';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.css']
})
export class SectorListComponent implements OnInit {

  sectors: Isector[];
  sector: Isector;
  sectorId: number;
  success: boolean;
  message: string;
  modalRef?: BsModalRef;
  pag : number = 1 ;
  contador : number = 5;

  constructor(
    private sectorService: SectorService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listAll();
  }

  listAll(){
    this.sectorService.getAll().subscribe(
      (respose) => {
        this.sectors = respose;
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  goCategories(sectorId: string){
    this.router.navigate(['sectors/categories'], {queryParams: { sector: sectorId}});
  }

}
