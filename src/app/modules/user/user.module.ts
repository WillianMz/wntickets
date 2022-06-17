import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserActivateComponent } from './user-activate/user-activate.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserRecoverPasswordComponent } from './user-recover-password/user-recover-password.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserAccountComponent } from './user-account/user-account.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserActivateComponent,
    UserRegisterComponent,
    UserRecoverPasswordComponent,
    UserLoginComponent,
    UserAccountComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
