import { EquipTipoFormComponent } from './equip-tipo-form/equip-tipo-form.component';
import { EquipTipoListComponent } from './equip-tipo-list/equip-tipo-list.component';
import { EquipFormComponent } from './equip-form/equip-form.component';
import { EquipListComponent } from './equip-list/equip-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'', component: EquipListComponent },
  { path:'new', component: EquipFormComponent },
  { path:'edit/:id', component: EquipFormComponent },
  { path:'tipo', component: EquipTipoListComponent },
  { path:'tipo/new', component: EquipTipoFormComponent},
  { path:'tipo/:id/edit', component: EquipTipoFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
