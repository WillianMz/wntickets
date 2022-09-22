import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipTypeListComponent } from './equip-type-list/equip-type-list.component';
import { EquipTypeFormComponent } from './equip-type-form/equip-type-form.component';

const routes: Routes = [
  { path:'', component: EquipTypeListComponent },
  { path:'new', component: EquipTypeFormComponent },
  { path:'edit/:id', component: EquipTypeFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentTypeRoutingModule { }
