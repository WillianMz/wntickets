import { AuthGuard } from './../auth/auth.guard';
import { SectorFormComponent } from './sector-form/sector-form.component';
import { SectorListComponent } from './sector-list/sector-list.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path:'',
    component: SectorListComponent,
    data: {
      roles: ['Usuario','Suporte','Gerente','Admin']
    }
  },
  {
    path:'new',
    component: SectorFormComponent,
    data: {
      roles: ['Admin']
    }
  },
  {
    path:':id/edit',
    component: SectorFormComponent,
    data: {
      roles: ['Admin']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectorRoutingModule { }
