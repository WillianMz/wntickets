import { ComponentsModule } from './../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserPageAdminComponent } from './user-page-admin/user-page-admin.component';
import { TableModule } from 'ngx-easy-table';
import { UserFormComponent } from './user-form/user-form.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    UserListComponent,
    UserAccountComponent,
    UserRoleComponent,
    UserPageAdminComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    TableModule,
    NgxMaskModule.forChild(),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
