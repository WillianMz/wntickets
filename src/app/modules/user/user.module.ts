import { ComponentsModule } from './../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserAccountComponent } from './user-account/user-account.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserAccountComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
