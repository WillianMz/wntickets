import { RoleResponse } from './../../../models/user/roleResponse.model';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {

  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;

  boolInput: boolean = false;
  roles: RoleResponse[];
  public configuration: Config;
  public columns: Columns[];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarRoles();
    this.configGrid();
  }

  adicionarRole() {
    this.boolInput = true;
  }

  private listarRoles(){
    this.userService.getRoles().subscribe({
      next: (response) => {
        if(response) {
          this.roles = response;
          console.log(this.roles);
        }
      },
      error: (response) => {
        console.log('erro');
      }
    })
  }

  private configGrid() {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.fixedColumnWidth = false;
    this.configuration.selectRow = true;
    this.configuration.rows = 10;
    this.configuration.tableLayout.striped = true;
    this.configuration.tableLayout.style = 'tiny';
    //colunas
    this.columns = [
      { key: 'id', title: 'Código' },
      { key: 'name', title: 'Nome' },
      { key: 'action', title: 'Opções', cellTemplate: this.actionTpl, searchEnabled:false }
    ];
  }

  public voltar() {
    this.router.navigate(['users']);
  }

}
