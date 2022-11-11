import { UsuarioResponse } from './../../../models/user/usuarioResponse.model';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { ErroServidor } from 'src/app/models/erroServidor';
import { ListarUsuarioModel } from 'src/app/models/user/listarUsuarioModel';
import { Usuario } from 'src/app/models/user/usuario.model';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;

  tituloDaPagina: string = 'Usuários';
  usuarios: UsuarioResponse[];
  success: boolean;
  message: string;
  erros: ErroServidor[];
  //filtros
  filterDisabled: boolean;

  public configuration: Config;
  public columns: Columns[];

  constructor(
    private userService: UserService,
    private router: Router,
    private notification: NotificationService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.configGrid();
    this.list();
  }

  private configGrid(){
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
    //colunas
    this.columns = [
      { key:'id', title:'Código' },
      { key:'nome', title:'Login' },
      { key:'email', title:'Email' },
      { key:'ativoString', title:'Status'},
      { key:'action', title: 'Opções', cellTemplate: this.actionTpl, searchEnabled:false }
    ];
  }

  private list() {
    this.listAll();
  }

  private listAll() {
    this.userService.getAll().subscribe({
      next: (response) => {
        this.usuarios = response.map(item => {
          return {
            ...item,
            ativoString: item.ativo ? 'Ativo' : 'Bloqueado'
          }
        });
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError('Erro ao obter dados');
      }
    });
  }

  public new() {
    this.router.navigate(['users/new']);
  }

  public editar(usuarioId: number) {
    this.router.navigate([`users/edit`], {queryParams: { pessoaId: usuarioId}});
  }

  public ativar(id: number) {

  }

  public desativar(id: number) {

  }

  public cleanFilters(){
    this.filterDisabled = false;
    this.listAll();
  }

  public saveFilter(){
    this.list();
  }

  public voltar() {
    this.router.navigate(['users']);
  }

  public delete(id: string) {
    this.userService.delete(id).subscribe({
      next: (response) => {
        this.success = response['sucesso'];

        //RETORNO BACK -> REGRAS DE NEGOCIO
        if(this.success == true){
          this.message = response['mensagem'];
          this.showSuccess(this.message);
          this.listAll();
        }
        else{
          this.message = response['mensagem'];
          this.showError(this.message);
        }
      },
      error: (response) => {
        //PEGA OS ERROS. FALHAS
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
      }
    });
  }

  public bloquear(id: string){
    this.userService.bloquear(id).subscribe({
      next: (response) => {
        if(response){
          this.success = response['sucesso'];
          this.message = response['mensagem'];
          this.notification.showInfo(this.message);
        }
      }
    });
  }

  public desbloquear(id: string){
    this.userService.desbloquear(id).subscribe({
      next: (response) => {
        if(response){
          this.success = response['sucesso'];
          this.message = response['mensagem'];
          this.notification.showInfo(this.message);
        }
      }
    });
  }

  public solicitarAtivacao(email: string) {
    this.userService.solicitarCodigo(email).subscribe({
      next: (response) => {
        if(response){
          this.success = response['sucesso'];
          this.message = response['mensagem'];
          this.notification.showInfo(this.message);
        }
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
