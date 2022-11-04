import { UserPageAdminComponent } from './user-page-admin/user-page-admin.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  { path:'', component: UserListComponent },
  { path:':id/edit', component: UserAccountComponent },
  
  { path:'new', component: UserAccountComponent },
  { path:'edit/:id', component: UserFormComponent },
  { path:'account', component: UserAccountComponent },
  { path:'minha-conta/:id', component: UserAccountComponent },
  { path:'list', component: UserListComponent },
  { path:'roles', component: UserRoleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
