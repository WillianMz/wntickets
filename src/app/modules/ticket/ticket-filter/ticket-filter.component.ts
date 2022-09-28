import { ToastrService } from 'ngx-toastr';
import { SectorService } from 'src/app/services/sector.service';
import { SetorModel } from 'src/app/models/sector/setorModel';
import { Component, OnInit } from '@angular/core';
import { TicketModel } from 'src/app/models/ticket/ticketModel';

@Component({
  selector: 'app-ticket-filter',
  templateUrl: './ticket-filter.component.html',
  styleUrls: ['./ticket-filter.component.css']
})
export class TicketFilterComponent implements OnInit {

  tickets: TicketModel[];
  setores: SetorModel[];
  boolSetor: boolean = true;

  constructor(
    private toastr: ToastrService,
    private sectorService: SectorService
  ) { }

  ngOnInit(): void {
    this.listAll();
    this.listarSetores();
  }

  private listAll() {    
    this.tickets = [
      {
        id: 123, criador: 'Willian', setor: 'Suporte', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', status: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 456, criador: 'Willian', setor: 'Suporte', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'ERRO AO ATUALIZAR SISTEMA', status: 'Pendente', prioridadeAtual: 'Normal'
      }
    ];
  }

  //OBTER SETORES
  private listarSetores() {
    this.sectorService.getAll().subscribe({
      next: (response) => {
        if(response != null){
          this.setores = response;
        }
        else {
          this.setores = [];
          this.showError('Não foi possível carregar os laboratórios');
        }
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  private showSuccess(message: string, title?: string){
    this.toastr.success(message, title);
  }

  private showError(message: string, title?: string){
    this.toastr.error(message, title);
  }

}
