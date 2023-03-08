import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipListComponent } from './equip-list/equip-list.component';
import { EquipFormComponent } from './equip-form/equip-form.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { TableModule } from 'ngx-easy-table';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { NgxCurrencyModule } from "ngx-currency";
import {TabViewModule} from 'primeng/tabview';
import { EquipTipoListComponent } from './equip-tipo-list/equip-tipo-list.component';
import { EquipTipoFormComponent } from './equip-tipo-form/equip-tipo-form.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    EquipListComponent,
    EquipFormComponent,
    EquipTipoListComponent,
    EquipTipoFormComponent
  ],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    TableModule,
    //NgxMaskModule.forChild(),
    NgxCurrencyModule,
    TabViewModule,
    ConfirmDialogModule
  ],
  providers: [
    ConfirmationService,
    provideEnvironmentNgxMask()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EquipmentModule { }
