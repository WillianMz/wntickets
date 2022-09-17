import { ToastrService } from 'ngx-toastr';
import { ErroServidor } from './../../../models/erroServidor';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaModel } from 'src/app/models/sector/categoriaModel';
import { SetorModel } from 'src/app/models/sector/setorModel';
import { TicketModel } from 'src/app/models/ticket/ticketModel';
import { CategoryService } from 'src/app/services/category.service';
import { SectorService } from 'src/app/services/sector.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-open-ticket',
  templateUrl: './open-ticket.component.html',
  styleUrls: ['./open-ticket.component.css']
})
export class OpenTicketComponent implements OnInit {

  tituloPagina: string = 'Novo Chamado';
  ticket: TicketModel
  sectors: SetorModel[];
  categories: CategoriaModel[];
  sectorId: number;
  ticketForm: FormGroup;
  selectStatus: boolean = true;
  selectPriority: boolean = true;
  message: string;
  success: boolean;
  erros: ErroServidor[];
  boolTitulo: boolean = true;
  boolAviso: boolean = false;
  boolAss: boolean = true;

  constructor(
    private setorService: SectorService,
    private categService: CategoryService,
    private toastr: ToastrService,
    private ticketService: TicketService
  ) {
    let ticket = { setorId:0, categoriaId:0, criadorId:0, assunto:'', descricao:'' };
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
      status: new FormControl(ticket.statusAtual),
      prioridade: new FormControl(ticket.prioridadeAtual),
      assunto: new FormControl(ticket.assunto, [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(35)
      ]),
      descricao: new FormControl(ticket.descricao, [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(250)
      ]),
/*       criador: new FormControl(ticket.criador, [
        Validators.required
      ]), */
    });
  }

  private listSectors() {
    this.setorService.getAll().subscribe({
      next: (response ) => {
        if(response != null){
          this.sectors = response;
        }
        else {
            this.sectors = [];
            this.showError('Não foi possível carregar os laboratórios');
          }
        },
      error: (error) => {
        alert(error);
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

  private showSuccess(message: string, title?: string){
    this.toastr.success(message, title);
  }

  private showError(message: string, title?: string){
    this.toastr.error(message, title);
  }

}
