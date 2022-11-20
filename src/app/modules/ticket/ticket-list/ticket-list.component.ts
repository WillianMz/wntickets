import { PessoaService } from './../../../services/pessoa.service';
import { CriadorResponse } from '../../../models/pessoa/criadorResponse.model';
import { OperadorResponse } from './../../../models/ticket/operadorResponse.model';
import { Usuario } from 'src/app/models/user/usuario.model';
import { LoginService } from './../../../services/login.service';
import { ChamadoResponse } from './../../../models/ticket/chamadoResponse.model';
import { NotificationService } from './../../../services/notification.service';
import { ErroServidor } from './../../../models/erroServidor';
import { Component, OnInit, TemplateRef, ViewChild, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { TicketService } from 'src/app/services/ticket.service';

import {ConfirmationService} from 'primeng/api';
import { VerificarPermissoes } from 'src/app/functions/verificarPermissoes';
import { FormControl, FormGroup } from '@angular/forms';
import { FiltroTicket } from './filtoTicket';
import { SectorService } from 'src/app/services/sector.service';
import { SetorResponse } from 'src/app/models/sector/setorResponse.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit, OnDestroy {
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  @Input() tituloVisivel: boolean;
  @Input() campoPesquisaVisivel: boolean;
  @Input() statusChamado: number = 0;

  //Armazena assinatura do Observable
  chamadoSub: Subscription;
  setorSub: Subscription;
  pessoaSub: Subscription;

  tituloDaPagina: string = 'Chamados';
  chamados: ChamadoResponse[];
  //chamado: ChamadoResponse;
  setores: SetorResponse[];
  operadores: OperadorResponse[];
  criadores: CriadorResponse[];
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
    private pessoaService: PessoaService,
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
    //this.list();
    this.consultarPorStatus(1);
    this.filtrarPor(8);
    let teste = new FiltroTicket();
    teste.status = 1;
    this.validarFormulario(teste);
  }

  ngOnDestroy(): void {
    if(this.chamadoSub){
      this.chamadoSub.unsubscribe;
    }

    if(this.pessoaSub){
      this.pessoaSub.unsubscribe;
    }

    if(this.setorSub){
      this.setorSub.unsubscribe;
    }
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
    this.configuration.selectRow = false;
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
    const usuarioLogado = this.loginService.usuarioLogado();
    const role = usuarioLogado?.perfil;
    return VerificarPermissoes.temPermissao(roleFuncionalidade, role!);
  }

  abrirChamado() {
    this.router.navigate(['/ticket/open']);
  }

  public editar(ticketId: string){
    this.router.navigate([`/ticket/${ticketId}/edit`]);
  }

  public visualizar(id: number){
    this.router.navigate([`/ticket/${id}/view`]);
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
        this.listarSetores();
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
        this.listarCriadores(true);
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
        this.listarOperadores(true);
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
    let teste = new FiltroTicket();
    teste.status = undefined;
    this.validarFormulario(teste);
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
    this.consultarPorStatus(2);
    //this.listarMeusChamados(this.statusChamado);
    //this.configGrid();  */
  }

  public remover(id: string) {
    this.confirmationService.confirm({
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      message: 'Confirma a exclusão deste chamado?',
      accept: () => {
        this.ticketService.delete(Number.parseInt(id)).subscribe({
          next: (response) => {
            this.sucesso = response['sucesso'];
            this.mensagem = response['mensagem'];

            //RETORNO BACK -> REGRAS DE NEGOCIO
            if(this.sucesso == true){
              this.notification.showSuccess(this.mensagem);
              this.consultarPorStatus(1);
              this.router.navigate(['/ticket']);
            }
            else{
              this.notification.showError(this.mensagem);
            }
          },
          error: () => {
            this.notification.showError('Erro ao excluír chamado');
          }
        });
      }
    });
  }

  public cleanFilters(){
    /* this.listarTodos(); */
    this.limparFiltros();
  }

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

  private consultarTicket() {
    this.chamadoSub = this.ticketService.getAll().subscribe({
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
    this.chamadoSub = this.ticketService.getBySetor(setorId).subscribe({
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
    this.setorSub = this.setorService.getAll(true).subscribe({
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
    this.chamadoSub = this.ticketService.getByTipo(tipoId).subscribe({
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
    this.chamadoSub = this.ticketService.getByAssunto(texto).subscribe({
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
    this.chamadoSub = this.ticketService.getByDescricao(texto).subscribe({
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
    this.chamadoSub = this.ticketService.getBySolucao(texto).subscribe({
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
    this.chamadoSub = this.ticketService.getByCriador(criadorId).subscribe({
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
    this.chamadoSub = this.ticketService.getByPrioridade(prioridadeId).subscribe({
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
    this.chamadoSub = this.ticketService.getByStatus(statusId).subscribe({
      next: (response) => {
        this.chamados = response;
        console.log(this.chamados);
        this.configPagina();
      },
      error: () => {
        //MELHORAR ESTA PARTE
        this.notification.showError('Ocorreu um erro');
      }
    });
  }
    
  private consultarPorOperador(operadorId: number){
    this.chamadoSub = this.ticketService.getByOperador(operadorId).subscribe({
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

  private listarCriadores(ativo: boolean) {
    this.pessoaSub = this.pessoaService.getUsuarios(ativo).subscribe({
      next: (response) => {
        if(response){
          this.criadores = response;
        }
      },
      error: () => {
        this.notification.showError('Ocorreu um erro ao consultar os criadores de chamados','Consultar usuários');
      }
    });
  }

  private listarOperadores(ativo: boolean) {
    this.pessoaSub = this.pessoaService.getOperadores(ativo).subscribe({
      next: (response) => {
        if(response){
          this.operadores = response;
          console.log('Operadores');
        }
      },
      error: () => {
        this.notification.showError('Ocorreu um erro ao consultar operadores','Consultar operadores');
      }
    });
  }
}
