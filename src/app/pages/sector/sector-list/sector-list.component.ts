import { Component, OnInit } from '@angular/core';
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

  constructor(
    private sectorService: SectorService
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
}
