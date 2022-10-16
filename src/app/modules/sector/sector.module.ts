import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorRoutingModule } from './sector-routing.module';
import { SectorFormComponent } from './sector-form/sector-form.component';
import { SectorListComponent } from './sector-list/sector-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { TableModule } from 'ngx-easy-table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    SectorFormComponent,
    SectorListComponent
  ],
  imports: [
    CommonModule,
    SectorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    TableModule,
    ConfirmDialogModule
  ],
  providers: [
    ConfirmationService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SectorModule { }
