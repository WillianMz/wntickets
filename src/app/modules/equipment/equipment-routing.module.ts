import { EquipFormComponent } from './equip-form/equip-form.component';
import { EquipListComponent } from './equip-list/equip-list.component';
import { EquipCategoryComponent } from './equip-category/equip-category.component';
import { EquipBrandComponent } from './equip-brand/equip-brand.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'brand', component: EquipBrandComponent },
  { path:'category', component: EquipCategoryComponent },
  { path:'', component: EquipListComponent },
  { path:'new', component: EquipFormComponent },
  { path:'edit/:id', component: EquipFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
