import { ComponentsModule } from './../../components/components.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';

import { TableModule } from 'ngx-easy-table';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MyAccoutComponent } from './my-accout/my-accout.component';


@NgModule({
  declarations: [
    UserListComponent,
    MyAccoutComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ComponentsModule,
    TableModule,
    TooltipModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
