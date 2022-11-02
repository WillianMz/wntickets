import { EquipTipoFormComponent } from './equip-tipo-form/equip-tipo-form.component';
import { EquipTipoListComponent } from './equip-tipo-list/equip-tipo-list.component';
import { EquipFormComponent } from './equip-form/equip-form.component';
import { EquipListComponent } from './equip-list/equip-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { 
    path:'',
    canActivate: [AuthGuard],
    component: EquipListComponent,
    data: {
      roles: ['Suporte','Gerente','Admin']
    }
  },
  { 
    path:'new',
    canActivate: [AuthGuard],
    component: EquipFormComponent,
    data: {
      roles: ['Gerente','Admin']
    }
  },
  { 
    path:'edit/:id',
    canActivate: [AuthGuard],
    component: EquipFormComponent,
    data: {
      roles: ['Gerente','Admin']
    }
  },
  { 
    path:'tipo',
    canActivate: [AuthGuard],
    component: EquipTipoListComponent,
    data: {
      roles: ['Suporte','Gerente','Admin']
    }
  },
  { 
    path:'tipo/new',
    canActivate: [AuthGuard],
    component: EquipTipoFormComponent,
    data: {
      roles: ['Gerente','Admin']
    }
  },
  { 
    path:'tipo/:id/edit',
    canActivate: [AuthGuard],
    component: EquipTipoFormComponent,
    data: {
      roles: ['Gerente','Admin']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
