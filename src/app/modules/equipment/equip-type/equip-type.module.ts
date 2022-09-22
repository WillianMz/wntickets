import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentTypeRoutingModule } from './equip-type-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { TableModule } from 'ngx-easy-table';
import { EquipTypeFormComponent } from './equip-type-form/equip-type-form.component';
import { RouterModule } from '@angular/router';
import { EquipTypeListComponent } from './equip-type-list/equip-type-list.component';



@NgModule({
  declarations: [
    EquipTypeFormComponent,
    EquipTypeListComponent
  ],
  imports: [
    CommonModule,
    EquipmentTypeRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule,
    TableModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EquipmentTypeModule { }
