import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipBrandComponent } from './equip-brand/equip-brand.component';
import { EquipCategoryComponent } from './equip-category/equip-category.component';
import { EquipListComponent } from './equip-list/equip-list.component';
import { EquipFormComponent } from './equip-form/equip-form.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { TableModule } from 'ngx-easy-table';


@NgModule({
  declarations: [
    EquipBrandComponent,
    EquipCategoryComponent,
    EquipListComponent,
    EquipFormComponent
  ],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    TableModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EquipmentModule { }
