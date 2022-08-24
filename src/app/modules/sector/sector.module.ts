import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorRoutingModule } from './sector-routing.module';
import { SectorFormComponent } from './sector-form/sector-form.component';
import { SectorListComponent } from './sector-list/sector-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { TableModule } from 'ngx-easy-table';


@NgModule({
  declarations: [
    SectorFormComponent,
    SectorListComponent,
    CategoryListComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    SectorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    TableModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SectorModule { }
