import { EquipFormComponent } from './equip-form/equip-form.component';
import { EquipListComponent } from './equip-list/equip-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipTypeListComponent } from './equip-type/equip-type-list/equip-type-list.component';

const routes: Routes = [
  { path:'', component: EquipListComponent },
  { path:'new', component: EquipFormComponent },
  { path:'edit/:id', component: EquipFormComponent },
  { path:'type', component: EquipTypeListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
