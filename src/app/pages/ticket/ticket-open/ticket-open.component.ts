import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryModel } from 'src/app/models/categoryModel';
import { SectorModel } from 'src/app/models/sectorModel';
import { TicketModel } from 'src/app/models/ticket/ticketModel';
import { CategoryService } from 'src/app/services/category.service';
import { SectorService } from 'src/app/services/sector.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-open',
  templateUrl: './ticket-open.component.html',
  styleUrls: ['./ticket-open.component.css']
})
export class TicketOpenComponent implements OnInit {

  ticket: TicketModel
  sectors: SectorModel[];
  categories: CategoryModel[];
  sectorId: number;
  ticketForm: FormGroup;
  selectStatus: boolean = true;
  selectPriority: boolean = true;

  constructor(
    private setorService: SectorService,
    private categService: CategoryService,
    private ticketService: TicketService
  ) {
    let ticket = {setorId:0, categoriaId:0, criadorId:0, assunto:'', descricao:''};
    this.startForm(ticket);
  }

  get sector(){
    return this.ticketForm.get('setor');
  }

  get category(){
    return this.ticketForm.get('categoria');
  }

  get title(){
    return this.ticketForm.get('assunto');
  }

  get description(){
    return this.ticketForm.get('description');
  }

  get status(){
    return this.ticketForm.get('status');
  }

  get priority(){
    return this.ticketForm.get('priority');
  }


  ngOnInit(): void {
    this.listSectors();
    console.log(this.sectorId)
  }

  loadCategories(){
    let id = this.sector?.value;
    this.listCategories(id);
  }

  private startForm(ticket: TicketModel){
    this.ticketForm = new FormGroup({
      setor: new FormControl(ticket.setor, [
        Validators.required
      ]),
      categoria: new FormControl(ticket.categoria, [
        Validators.required
      ]),
      criador: new FormControl(ticket.criador, [
        Validators.required
      ]),
      assunto: new FormControl(ticket.assunto, [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(40)
      ]),
      descricao: new FormControl(ticket.descricao, [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(250)
      ]),
      status: new FormControl(ticket.statusAtual),
      prioridade: new FormControl(ticket.prioridadeAtual)
    });
  }

  private listSectors(){
    this.setorService.getAll().subscribe({
      next: (response ) => {
        this.sectors = response;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  private listCategories(sectorId: number){
    this.categService.getBySector(sectorId, true).subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

}
