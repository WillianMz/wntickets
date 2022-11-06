import { ModulosGuard } from './../../guards/modulos.guard';
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
    component: EquipListComponent,
//    canActivateChild: [ModulosGuard]
    data: {
      roles: ['Gerente','Admin','Suporte']
    }
  },
  {
    path:'new',
    //canActivateChild: [ModulosGuard],
    component: EquipFormComponent,
    data: {
      roles: ['Gerente','Admin']
    }
  },
  {
    path:'edit/:id',
    //canActivateChild: [ModulosGuard],
    component: EquipFormComponent,
    data: {
      roles: ['Gerente','Admin']
    }
  },
  {
    path:'tipo',
    //canActivateChild: [ModulosGuard],
    component: EquipTipoListComponent,
    data: {
      roles: ['Suporte','Gerente','Admin']
    }
  },
  {
    path:'tipo/new',
    //canActivateChild: [ModulosGuard],
    component: EquipTipoFormComponent,
    data: {
      roles: ['Gerente','Admin']
    }
  },
  {
    path:'tipo/:id/edit',
    //canActivateChild: [ModulosGuard],
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
