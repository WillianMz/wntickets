import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRecoverPasswordComponent } from './auth-recover-password/auth-recover-password.component';
import { AuthUserActivateComponent } from './auth-user-activate/auth-user-activate.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    AuthLoginComponent,
    AuthRecoverPasswordComponent,
    AuthUserActivateComponent,
    AuthRegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
  ]
})
export class AuthModule { }
