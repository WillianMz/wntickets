import { ActivateUserComponent } from './activate-user/activate-user.component';
import { RegisterComponent } from './register/register.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'register', component: RegisterComponent},
  { path:'recover', component: RecoverPasswordComponent},
  { path:'activate', component: ActivateUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
