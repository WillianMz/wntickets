import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ChamadoResponse } from 'src/app/models/ticket/chamadoResponse.model';
import { Usuario } from 'src/app/models/user/usuario.model';
import { NotificationService } from 'src/app/services/notification.service';
import { TicketService } from 'src/app/services/ticket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meus-tickets',
  templateUrl: './meus-tickets.component.html',
  styleUrls: ['./meus-tickets.component.css']
})
export class MeusTicketsComponent implements OnInit, OnDestroy {
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  
  chamadosSub: Subscription; // Armazena assinatura do Observable
  pendentesSub: Subscription;
  finalizadosSub: Subscription;

  chamados: ChamadoResponse[];
  chamadosPendentes: ChamadoResponse[];
  chamadosFinalizados: ChamadoResponse[];
  usuarioLogado: Usuario;
  public configuration: Config;
  public columns: Columns[];

  constructor(
    private ticketService: TicketService,
    private notification: NotificationService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.configGrid();
    this.listarMeusChamados();
    this.listarPendentes();
    this.listarFinalizados();
  }

  ngOnDestroy() {
    if (this.chamadosSub) {
      this.chamadosSub.unsubscribe();
      console.log('1');
    }

    if (this.pendentesSub) {
      this.pendentesSub.unsubscribe();
      console.log('2');
    }

    if (this.finalizadosSub) {
      this.finalizadosSub.unsubscribe();
      console.log('3');
    }
  }

  private configGrid() {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.fixedColumnWidth = false;
    this.configuration.selectRow = true;
    this.configuration.rows = 10;
    this.configuration.columnReorder = true;
    //bordas
    this.configuration.tableLayout.borderless = false;
    //hover
    this.configuration.tableLayout.hover = true;
    this.configuration.tableLayout.striped = true;
    this.configuration.tableLayout.style = 'tiny';
    // ... etc.
    this.columns = [
      { key: 'id', title: 'Código' },
      { key: 'assunto', title: 'Assunto' },
      { key: 'status', title: 'Status' },
      { key: 'dataAbertura', title: 'Aberto em' },
      { key: 'criador.nome', title: 'Criado por' },
      { key: 'setor.nome', title: 'Laboratório' },
      { key: 'action', title: 'Opções', cellTemplate: this.actionTpl, searchEnabled: false }
    ];
  }

  abrirChamado() {
    this.router.navigate(['/ticket/open']);
  }

  private listarMeusChamados(){
    this.chamadosSub = this.ticketService.getMeusChamados(0).subscribe({
      next: (response) => {
        if(response){
          this.chamados = response;
        }
        else{
          this.chamados = [];
        }
      },
      error: () => {
        this.notification.showError('Ocorreu um erro');
      }
    });
  }

  private listarPendentes(){
    this.pendentesSub = this.ticketService.getMeusChamados(2).subscribe({
      next: (response) => {
        if(response){
          this.chamadosPendentes = response;
        }
        else{
          this.chamadosPendentes = [];
        }
      },
      error: () => {
        this.notification.showError('Ocorreu um erro');
      }
    });
  }

  private listarFinalizados(){
    this.finalizadosSub = this.ticketService.getMeusChamados(6).subscribe({
      next: (response) => {
        if(response){
          this.chamadosFinalizados = response;
        }
        else{
          this.chamadosFinalizados = [];
        }
      },
      error: () => {
        this.notification.showError('Ocorreu um erro');
      }
    });
  }

}
