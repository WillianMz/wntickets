import { AuthUserActivateComponent } from './auth-user-activate/auth-user-activate.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthRecoverPasswordComponent } from './auth-recover-password/auth-recover-password.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'', component: AuthLoginComponent },
  { path:'nova-conta', component: AuthRegisterComponent },
  { path:'recuperar', component: AuthRecoverPasswordComponent },
  { path:'ativar', component: AuthUserActivateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
