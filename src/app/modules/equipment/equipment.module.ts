import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipBrandComponent } from './equip-brand/equip-brand.component';
import { EquipCategoryComponent } from './equip-category/equip-category.component';
import { EquipListComponent } from './equip-list/equip-list.component';
import { EquipFormComponent } from './equip-form/equip-form.component';


@NgModule({
  declarations: [
    EquipBrandComponent,
    EquipCategoryComponent,
    EquipListComponent,
    EquipFormComponent
  ],
  imports: [
    CommonModule,
    EquipmentRoutingModule
  ]
})
export class EquipmentModule { }
