import { Component, OnInit, TemplateRef } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ErroServidor } from 'src/app/models/erroServidor';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  titlePage: string;
  success: boolean;
  message: string;
  erros: ErroServidor[];
  //filtros
  filterDisabled: boolean;

  public configuration: Config;
  public columns: Columns[];

  constructor() { }

  ngOnInit(): void {
    this.titlePage = 'Usuários';
    this.configGrid();
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


}
