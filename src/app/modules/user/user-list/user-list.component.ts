import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
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
  users: ListarUsuarioModel[];
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
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.configGrid();
    this.list();
  }

  private configGrid(){
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.resizeColumn = true;
    this.configuration.fixedColumnWidth = false;
    this.configuration.selectRow = true;
    this.configuration.rows = 5;
    //colunas
    this.columns = [
      { key: 'id', title: 'Código' },
      { key: 'nome', title: 'Nome' },
      { key: 'email', title: 'Email' },
/*       { key: 'tipo', title: 'Tipo' },
      { key: 'login', title: 'Login' }, */
      { key: 'action', title: 'Opções', cellTemplate: this.actionTpl, searchEnabled:false }
    ];
  }

  private list() {
    this.listAll();
  }

  private listAll() {
    this.spinner.show();

    this.userService.getAll().subscribe({
      next: (response) => {
        this.users = response;
        this.spinner.hide();
      },
      error: (response) => {
        this.success = response.error['sucesso'];
        this.message = response.error['mensagem'];
        this.erros = response.error['objeto'];
        this.notification.showError('Erro ao obter dados');
        this.spinner.hide();
      }
    });
  }

  public new() {
    this.router.navigate(['users/new']);
  }

  public edit(usuarioId: number) {
    this.router.navigate([`users/edit/${usuarioId}`]);
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
    this.spinner.show();

    this.userService.delete(id).subscribe({
      next: (response) => {
        this.success = response['sucesso'];

        //RETORNO BACK -> REGRAS DE NEGOCIO
        if(this.success == true){
          this.message = response['mensagem'];
          this.showSuccess(this.message);
          this.router.navigate(['/users']);
          this.spinner.hide();
        }
        else{
          this.message = response['mensagem'];
          this.showError(this.message);
          this.spinner.hide();
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
  
  private showSuccess(message: string, title?: string){
    this.toastr.success(message, title);
  }

  private showError(message: string, title?: string){
    this.toastr.error(message, title);
  }

}
