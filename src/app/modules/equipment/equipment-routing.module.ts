import { EquipTipoFormComponent } from './equip-tipo-form/equip-tipo-form.component';
import { EquipTipoListComponent } from './equip-tipo-list/equip-tipo-list.component';
import { EquipFormComponent } from './equip-form/equip-form.component';
import { EquipListComponent } from './equip-list/equip-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: EquipListComponent,
    data: {
      roles: ['Gerente','Admin','Suporte']
    }
  },
  {
    path:'new',
    component: EquipFormComponent,
    data: {
      roles: ['Gerente','Admin']
    }
  },
  {
    path:'edit/:id',
    component: EquipFormComponent,
    data: {
      roles: ['Gerente','Admin']
    }
  },
  {
    path:'tipo',
    component: EquipTipoListComponent,
    data: {
      roles: ['Suporte','Gerente','Admin']
    }
  },
  {
    path:'tipo/new',
    component: EquipTipoFormComponent,
    data: {
      roles: ['Gerente','Admin']
    }
  },
  {
    path:'tipo/:id/edit',
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
