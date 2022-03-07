import { ErroServidor } from 'src/app/models/erroServidor';
import { UsuarioDTO } from './../../../models/user/usuarioDTO';
import { UserService } from './../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  titlePage: string;
  users: UsuarioDTO[];
  user: UsuarioDTO;
  success: boolean;
  message: string;
  erros: ErroServidor[];
  modalRef?: BsModalRef;

  //filtros
  filterDisabled: boolean;

  public configuration: Config;
  public columns: Columns[];

  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.configGrid();
    this.listAll();
  }

  public edit(id: string){
    this.router.navigate([`users/${id}/edit`]);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
      { key: 'id', title: 'Id' },
      { key: 'nome', title: 'Nome' },
      { key: 'email', title: 'Email' },
      { key: 'tipo', title: 'Tipo' },
      { key: 'login', title: 'Login' },
      { key: 'isActive', title: 'Ações' }
    ];
  }

  private listAll() {
    this.userService.getAll().subscribe({
      next: (response) => {
        this.success = response['sucesso']        ;
        this.message = response['mensagem'];
        this.users = response;
        this.titlePage = 'Todos os usuários';

        /* if(this.success == true) {
          this.users = response['objeto'];
          this.titlePage = 'Usuários';
        }
        else {
          this.message = response['mensagem'];
          this.users = [];
        } */
      },
      error: (response) => {
        this.success = response.error['sucesso'];
          this.message = response.error['mensagem'];
          this.erros = response.error['objeto'];
      }
    });
  }

  private listDisabled() {
    this.userService.getDesativados().subscribe({
      next: (response) => {
        this.success = response['sucesso']        ;
        this.message = response['mensagem'];

        if(this.success == true) {
          this.users == response['objeto'];
          this.titlePage = 'Usuários';
        }
        else {
          this.message = response['mensagem'];
          this.users = [];
        }
      },
      error: (response) => {
        this.success = response.error['sucesso'];
          this.message = response.error['mensagem'];
          this.erros = response.error['objeto'];
      }
    });
  }

  private disable(id: number) {
    this.userService.disable(id).subscribe({
      next: (response) => {
        this.success = response['sucesso']        ;
        this.message = response['mensagem'];

        if(this.success == true) {
        }
      },
      error: (response) => {
        this.success = response.error['sucesso'];
          this.message = response.error['mensagem'];
          this.erros = response.error['objeto'];
      }
    });
  }

  private delete(id: number) {
    this.userService.delete(id).subscribe({
      next: (response) => {
        this.success = response['sucesso']        ;
        this.message = response['mensagem'];

        if(this.success == true) {
        }
        else {
        }
      },
      error: (response) => {
        this.success = response.error['sucesso'];
          this.message = response.error['mensagem'];
          this.erros = response.error['objeto'];
      }
    });
  }

}
