import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { provideEnvironmentNgxMask } from 'ngx-mask';
import { ComponentsModule } from 'src/app/components/components.module';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthNewPasswordComponent } from './auth-new-password/auth-new-password.component';
import { AuthRecoverPasswordComponent } from './auth-recover-password/auth-recover-password.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthUserActivateComponent } from './auth-user-activate/auth-user-activate.component';


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
    ComponentsModule
    //NgxMaskModule.forChild()
  ],
  providers: [
    provideEnvironmentNgxMask()
  ]
})
export class AuthModule { }
