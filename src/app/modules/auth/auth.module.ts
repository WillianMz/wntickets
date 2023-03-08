import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRecoverPasswordComponent } from './auth-recover-password/auth-recover-password.component';
import { AuthUserActivateComponent } from './auth-user-activate/auth-user-activate.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { AuthNewPasswordComponent } from './auth-new-password/auth-new-password.component';


@NgModule({
  declarations: [
    AuthLoginComponent,
    AuthRecoverPasswordComponent,
    AuthUserActivateComponent,
    AuthRegisterComponent,
    AuthNewPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //NgxMaskModule.forChild()
  ],
  providers: [
    provideEnvironmentNgxMask()
  ]
})
export class AuthModule { }
