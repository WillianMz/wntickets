import { Component, OnInit } from '@angular/core';
import { TicketModel } from 'src/app/models/ticket/ticketModel';

@Component({
  selector: 'app-ticket-filter',
  templateUrl: './ticket-filter.component.html',
  styleUrls: ['./ticket-filter.component.css']
})
export class TicketFilterComponent implements OnInit {

  tickets: TicketModel[];

  constructor() { }

  ngOnInit(): void {
    this.listAll();
  }

  private listAll() {    
    this.tickets = [
      {
        id: 123, criador: 'Willian', setor: 'Suporte', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 456, criador: 'Willian', setor: 'Suporte', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'ERRO AO ATUALIZAR SISTEMA', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 789, criador: 'Willian', setor: 'Suporte', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMANDO INVÁLIDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 321, criador: 'Willian', setor: 'Suporte', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'IMPORTAR DADOS DE XML', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 654, criador: 'Willian', setor: 'Desenvolvimento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'INSTALAR PROGRAMA MICROSOFT OFFICE 365 HOJE', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 987, criador: 'Luna', setor: 'Desenvolvimento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'SOLICITACAO DE MANUTENCAO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 147, criador: 'Helena', setor: 'Desenvolvimento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'MONTAGEM DE NOVO COMPUTADOR', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 123, criador: 'Willian', setor: 'Desenvolvimento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 456, criador: 'Willian', setor: 'Desenvolvimento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 789, criador: 'Willian', setor: 'Manutenção', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 321, criador: 'Willian', setor: 'Manutenção', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 654, criador: 'Willian', setor: 'Manutenção', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 987, criador: 'Willian', setor: 'Manutenção', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 147, criador: 'Willian', setor: 'Manutenção', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 123, criador: 'Willian', setor: 'Manutenção', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 456, criador: 'Willian', setor: 'Treinamento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 789, criador: 'Willian', setor: 'Treinamento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 321, criador: 'Willian', setor: 'Treinamento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 654, criador: 'Willian', setor: 'Treinamento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 987, criador: 'Willian', setor: 'Treinamento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      },
      {
        id: 147, criador: 'Willian', setor: 'Treinamento', categoria: 'Manutenção', dataAbertura: '08/08/2022',
        assunto: 'COMPUTADOR NÃO ESTA LIGANDO', statusAtual: 'Pendente', prioridadeAtual: 'Normal'
      }
    ];
  }

}
