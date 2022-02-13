import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';

import { TableModule } from 'ngx-easy-table';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MyAccoutComponent } from './my-accout/my-accout.component';


@NgModule({
  declarations: [
    UserFormComponent,
    UserListComponent,
    MyAccoutComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    TableModule,
    TooltipModule
  ]
})
export class UserModule { }
