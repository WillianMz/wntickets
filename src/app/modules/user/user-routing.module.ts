import { UserPageAdminComponent } from './user-page-admin/user-page-admin.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  { 
    path:'',
    component: UserListComponent,
    data: {
      roles: ['Admin']
    }
  },
  {
    path:':id/edit',
    component: UserAccountComponent,
    data: {
      roles: ['Admin']
    }
  },
  { 
    path:'new', component: UserFormComponent,
    data: {
      roles: ['Admin']
    }
  },
  { 
    path:'edit/:id', component: UserFormComponent,
    data: {
      roles: ['Admin']
    }
  },
  { 
    path:'account', component: UserAccountComponent,
    data: {
      roles: ['Gerente','Admin','Suporte','Usuario']
    }
  },
  { 
    path:'minha-conta/:id', component: UserAccountComponent,
    data: {
      roles: ['Gerente','Admin','Suporte','Usuario']
    }
  },
  { 
    path:'list', component: UserListComponent,
    data: {
      roles: ['Admin']
    }
  },
  { 
    path:'roles', component: UserRoleComponent,
    data: {
      roles: ['Admin']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
