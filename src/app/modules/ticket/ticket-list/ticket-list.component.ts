import { Usuario } from 'src/app/models/user/usuario.model';
import { LoginService } from './../../../services/login.service';
import { ChamadoResponse } from './../../../models/ticket/chamadoResponse.model';
import { NotificationService } from './../../../services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErroServidor } from './../../../models/erroServidor';
import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { TicketService } from 'src/app/services/ticket.service';

import {ConfirmationService} from 'primeng/api';
import { VerificarPermissoes } from 'src/app/functions/verificarPermissoes';
import { FormControl, FormGroup } from '@angular/forms';
import { FiltroTicket } from './filtoTicket';
import { SectorService } from 'src/app/services/sector.service';
import { SetorResponse } from 'src/app/models/sector/setorResponse.model';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  @Input() tituloVisivel: boolean;
  @Input() campoPesquisaVisivel: boolean;
  @Input() statusChamado: number = 0;

  display: boolean = false;
  tituloDaPagina: string = 'Chamados';
  chamados: ChamadoResponse[];
  chamado: ChamadoResponse;
  setores: SetorResponse[];
  chamadoId: number;
  sucesso: boolean;
  mensagem: string;
  descricao: string;
  usuarioLogado: Usuario;
  erros: ErroServidor[];
  filtroForm: FormGroup;
  nomeBotaoFiltro: string = 'Filtro';
  sectorId: number;
  tipoId: number;
  criadorId: number;
  prioridadeId: number;
  statusId: number;
  operadorId: number;
  verGrid: boolean = false;
  verComboboxSetores: boolean = false;
  verComboboxTipos: boolean = false;
  verComboboxCriadores: boolean = false;
  verComboboxPrioridades: boolean = false;
  verComboboxStatus: boolean = false;
  verComboboxOperadores: boolean = false;
  campo_pesquisa: boolean = true;

  public configuration: Config;
  public columns: Columns[];

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private notification: NotificationService,
    private confirmationService: ConfirmationService,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private setorService: SectorService
  ) { 
    this.tituloVisivel = true;
    this.campoPesquisaVisivel = true;
    const filtro = new FiltroTicket()
    this.validarFormulario(filtro);
  }

  ngOnInit(): void {
    let user = this.loginService.usuarioLogado();
    if(user){
      this.usuarioLogado = user;
      this.configGrid();
      this.list();
    }

    this.activatedRoute.queryParams.subscribe(
      params => {
        this.sectorId = parseInt(params.sector);
        this.tipoId = parseInt(params.tipo);
        this.criadorId = parseInt(params.criador);
        this.prioridadeId = parseInt(params.prioridade);
        this.statusId = parseInt(params.status);
        this.operadorId = parseInt(params.operador);
      }
    );

    this.configGrid();
    this.list();
    this.listarSetores();
  }

  get texto(){
    return this.filtroForm.get('texto')?.value;
  }

  get setorID() {
    return this.filtroForm.get('setor')?.value;
  }

  get tipoID(){
    return this.filtroForm.get('tipo')?.value;
  }

  get criadorID(){
    return this.filtroForm.get('criador')?.value;
  }

  get prioridadeID(){
    return this.filtroForm.get('prioridade')?.value;
  }

  get statusID(){
    return this.filtroForm.get('status')?.value;
  }

  get operadorID(){
    return this.filtroForm.get('operador')?.value;
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

  public verificarPermissao(roleFuncionalidade: string[]): boolean{
    //const usuarioLogado = this.loginService.usuarioLogado();
    const role = this.usuarioLogado?.perfil;
    //this.usuario = usuarioLogado!;
    return VerificarPermissoes.temPermissao(roleFuncionalidade, role!);
  }

  confirm() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            //Actual logic to perform a confirmation
            alert('OK');
        }
    });
  }

  newTicket() {
    this.router.navigate(['/ticket/open']);
  }

  public filtrarPor(filtro: number){
    switch(filtro) {
      case 1://TODOS
      this.nomeBotaoFiltro = 'Todos';
        this.verComboboxSetores = false;
        this.verComboboxTipos = false;
        this.verComboboxCriadores = false;
        this.verComboboxPrioridades = false;
        this.verComboboxStatus = false;
        this.verComboboxOperadores = false;
        this.campo_pesquisa = true;
        this.consultarTicket();
        break;
      case 2://SETOR
        this.nomeBotaoFiltro = 'Filtrando por laboratório';
        this.verComboboxSetores = true;
        this.verComboboxTipos = false;
        this.verComboboxCriadores = false;
        this.verComboboxPrioridades = false;
        this.verComboboxStatus = false;
        this.verComboboxOperadores = false;
        this.campo_pesquisa = false;
        break;
      case 3://TIPO
        this.nomeBotaoFiltro = 'Filtrando por tipo';
        this.verComboboxSetores = false;
        this.verComboboxTipos = true;
        this.verComboboxCriadores = false;
        this.verComboboxPrioridades = false;
        this.verComboboxStatus = false;
        this.verComboboxOperadores = false;
        this.campo_pesquisa = false;
        break;
      case 4://DESCRIÇÃO
        this.nomeBotaoFiltro = 'Filtrando por descrição';
        this.verComboboxSetores = false;
        this.verComboboxTipos = false;
        this.verComboboxCriadores = false;
        this.verComboboxPrioridades = false;
        this.verComboboxStatus = false;
        this.verComboboxOperadores = false;
        this.campo_pesquisa = true;
        this.consultarPorDescricao(this.texto);
        break;
      case 5://SOLUÇÃO
        this.nomeBotaoFiltro = 'Filtrando por solução';
        this.verComboboxSetores = false;
        this.verComboboxTipos = false;
        this.verComboboxCriadores = false;
        this.verComboboxPrioridades = false;
        this.verComboboxStatus = false;
        this.verComboboxOperadores = false;
        this.campo_pesquisa = true;
        this.consultarPorSolucao(this.texto);
        break;
      case 6://CRIADOR
        this.nomeBotaoFiltro = 'Filtrando por criador';
        this.verComboboxSetores = false;
        this.verComboboxTipos = false;
        this.verComboboxCriadores = true;
        this.verComboboxPrioridades = false;
        this.verComboboxStatus = false;
        this.verComboboxOperadores = false;
        this.campo_pesquisa = false;
        break;
      case 7://PRIORIDADE
        this.nomeBotaoFiltro = 'Filtrando por prioridade';
        this.verComboboxSetores = false;
        this.verComboboxTipos = false;
        this.verComboboxCriadores = false;
        this.verComboboxPrioridades = true;
        this.verComboboxStatus = false;
        this.verComboboxOperadores = false;
        this.campo_pesquisa = false;
        break;
      case 8://STATUS
        this.nomeBotaoFiltro = 'Filtrando por status';
        this.verComboboxSetores = false;
        this.verComboboxTipos = false;
        this.verComboboxCriadores = false;
        this.verComboboxPrioridades = false;
        this.verComboboxStatus = true;
        this.verComboboxOperadores = false;
        this.campo_pesquisa = false;
        break;
      case 9://OPERADOR
        this.nomeBotaoFiltro = 'Filtrando por operador';
        this.verComboboxSetores = false;
        this.verComboboxTipos = false;
        this.verComboboxCriadores = false;
        this.verComboboxPrioridades = false;
        this.verComboboxStatus = false;
        this.verComboboxOperadores = true;
        this.campo_pesquisa = false;
        break;
      default:
        this.nomeBotaoFiltro = 'Todos';
        this.verComboboxSetores = false;
        this.verComboboxTipos = false;
        this.verComboboxCriadores = false;
        this.verComboboxPrioridades = false;
        this.verComboboxStatus = false;
        this.verComboboxOperadores = false;
        this.campo_pesquisa = true;
        break;
    }
  }

  public limparFiltros(){
    this.nomeBotaoFiltro = 'Padrão';
    this.verComboboxSetores = false;
    this.verComboboxTipos = false;
    this.verComboboxCriadores = false;
    this.verComboboxPrioridades = false;
    this.verComboboxStatus = false;
    this.verComboboxOperadores = false;
    this.campo_pesquisa = true;
    this.router.navigate(['ticket']);
    this.consultarTicket();
  }

  public procurar(){
    if(this.setorID){
      this.consultarPorSetor(this.setorID);
    }
    if(this.sectorId){
      this.consultarPorSetor(this.sectorId);
    }    
    if(this.tipoID){
      this.consultarPorTipo(this.tipoID);
    }
    if(this.tipoId){
      this.consultarPorTipo(this.tipoId);
    }
    if(this.texto){
      this.consultarPorAssunto(this.texto);
    }
    if(this.texto){
      this.consultarPorDescricao(this.texto);
    }
    if(this.texto){
      this.consultarPorSolucao(this.texto);
    }
    if(this.criadorID){
      this.consultarPorCriador(this.criadorID);
    }
    if(this.criadorId){
      this.consultarPorCriador(this.criadorId);
    }
    if(this.prioridadeID){
      this.consultarPorPrioridade(this.prioridadeID);
    }
    if(this.prioridadeId){
      this.consultarPorPrioridade(this.prioridadeId);
    }
    if(this.statusID){
      this.consultarPorStatus(this.statusID);
    }
    if(this.statusId){
      this.consultarPorStatus(this.statusId);
    }
    if(this.operadorID){
      this.consultarPorOperador(this.operadorID);
    }
    if(this.operadorId){
      this.consultarPorOperador(this.operadorId);
    }
  }


  private list() {
    //this.listarTodos();
    this.listarMeusChamados(this.statusChamado);
  }

  public delete(id: string) {
    this.confirmationService.confirm({
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      message: 'Confirma a exclusão deste chamado?',
      accept: () => {
        this.ticketService.delete(Number.parseInt(id)).subscribe({
          next: (response) => {
            this.sucesso = response['sucesso'];

            //RETORNO BACK -> REGRAS DE NEGOCIO
            if(this.sucesso == true){
              this.mensagem = response['mensagem'];
              this.notification.showSuccess(this.mensagem);
              this.router.navigate(['/ticket']);
              console.log('1');
            }
            else{
              this.mensagem = response['mensagem'];
              this.notification.showError(this.mensagem);
              console.log('2');
            }
          },
          error: (response) => {
            //PEGA OS ERROS. FALHAS
            this.sucesso = response.error['sucesso'];
            this.mensagem = response.error['mensagem'];
            this.erros = response.error['objeto'];
          }
        });
      }
    });
  }
 
  public edit(ticketId: string){
    this.router.navigate([`/ticket/${ticketId}/edit`]);
  }

  public cleanFilters(){
    this.listarTodos();
  }

  /* public search(){
    this.listByName();
  } */

  /* private listByName() {
    this.spinner.show();

    this.ticketService.getAll().subscribe({
      next: (response) => {
        this.chamados = response;
        this.spinner.hide();
      },
      error: (response) => {
        this.sucesso = response.error['sucesso'];
        this.mensagem = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.spinner.hide();
      }
    });
  } */

  private configPagina(){
    if(this.chamados.length > 0){
      this.verGrid = true;
    }
    else {
      this.verGrid = false;
      this.chamados = [];
    }
  }

  private validarFormulario(filtro: FiltroTicket){
    this.filtroForm = new FormGroup({
      texto: new FormControl(filtro.texto),
      setor: new FormControl(filtro.setor),
      tipo: new FormControl(filtro.tipo),
      criador: new FormControl(filtro.criador),
      prioridade: new FormControl(filtro.prioridade),
      status: new FormControl(filtro.status),
      operador: new FormControl(filtro.operador)
    });
  }
  

  private listarTodos(){
    this.ticketService.getAll().subscribe({
      next: (response) => {
        if(response){
          this.chamados = response;
        }
        else {
          this.notification.showWarning('Não foi possível consultar todos os chamados!');
        }
      },
      error: () => {
        this.notification.showError('Ocorreu um erro');
      }
    });
  }

  private listarMeusChamados(status: number){
    /* this.spinner.show(); */
    this.ticketService.getMeusChamados(status).subscribe({
      next: (response) => {
        if(response){
          this.chamados = response;
          /* this.spinner.hide(); */
        }
        else{
          this.notification.showWarning('Não foi possível obter os chamados!')
          /* this.spinner.hide(); */
        }
      },
      error: () => {
        //MELHORAR ESTA PARTE
        this.notification.showError('Ocorreu um erro');
      }
    });
  }


    /*CONSULTAS **********************************************************/

    private consultarTicket() {
      this.ticketService.getAll().subscribe({
        next: (response) => {
          this.chamados = response;
          this.configPagina();
        },
        error: () => {
          //MELHORAR ESTA PARTE
          this.notification.showError('Ocorreu um erro');
        }
      });
    }
  
    private consultarPorSetor(setorId: number){
      this.ticketService.getBySetor(setorId).subscribe({
        next: (response) => {
          this.chamados = response;
          this.configPagina();
        },
        error: () => {
          //MELHORAR ESTA PARTE
          this.notification.showError('Ocorreu um erro');
        }
      });
    }
  
    private listarSetores(){
      this.setorService.getAll(true).subscribe({
        next: (response) => {
          this.setores = response;
        },
        error: () => {
          //MELHORAR ESTA PARTE
          this.notification.showError('Ocorreu um erro');
        }
      });
    }
  
    private consultarPorTipo(tipoId: number){
      this.ticketService.getByTipo(tipoId).subscribe({
        next: (response) => {
          this.chamados = response;
          this.configPagina();
        },
        error: () => {
          //MELHORAR ESTA PARTE
          this.notification.showError('Ocorreu um erro');
        }
      });
    }
  
    private consultarPorAssunto(texto: string){
      this.ticketService.getByAssunto(texto).subscribe({
        next: (response) => {
          this.chamados = response;
          this.configPagina();
        },
        error: () => {
          //MELHORAR ESTA PARTE
          this.notification.showError('Ocorreu um erro');
        }
      });
    }
  
    private consultarPorDescricao(texto: string){
      this.ticketService.getByDescricao(texto).subscribe({
        next: (response) => {
          this.chamados = response;
          this.configPagina();
        },
        error: () => {
          //MELHORAR ESTA PARTE
          this.notification.showError('Ocorreu um erro');
        }
      });
    }
  
    private consultarPorSolucao(texto: string){
      this.ticketService.getBySolucao(texto).subscribe({
        next: (response) => {
          this.chamados = response;
          this.configPagina();
        },
        error: () => {
          //MELHORAR ESTA PARTE
          this.notification.showError('Ocorreu um erro');
        }
      });
    }
  
    private consultarPorCriador(criadorId: number){
      this.ticketService.getByCriador(criadorId).subscribe({
        next: (response) => {
          this.chamados = response;
          this.configPagina();
        },
        error: () => {
          //MELHORAR ESTA PARTE
          this.notification.showError('Ocorreu um erro');
        }
      });
    }
  
    private consultarPorPrioridade(prioridadeId: number){
      this.ticketService.getByPrioridade(prioridadeId).subscribe({
        next: (response) => {
          this.chamados = response;
          this.configPagina();
        },
        error: () => {
          //MELHORAR ESTA PARTE
          this.notification.showError('Ocorreu um erro');
        }
      });
    }
  
    private consultarPorStatus(statusId: number){
      this.ticketService.getByStatus(statusId).subscribe({
        next: (response) => {
          this.chamados = response;
          this.configPagina();
        },
        error: () => {
          //MELHORAR ESTA PARTE
          this.notification.showError('Ocorreu um erro');
        }
      });
    }
    
    private consultarPorOperador(operadorId: number){
      this.ticketService.getByOperador(operadorId).subscribe({
        next: (response) => {
          this.chamados = response;
          this.configPagina();
        },
        error: () => {
          //MELHORAR ESTA PARTE
          this.notification.showError('Ocorreu um erro');
        }
      });
    }
}
