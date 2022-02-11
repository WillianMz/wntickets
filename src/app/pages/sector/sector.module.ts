import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorRoutingModule } from './sector-routing.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { SectorFormComponent } from './sector-form/sector-form.component';
import { SectorListComponent } from './sector-list/sector-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { TableModule } from 'ngx-easy-table';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    CategoryFormComponent,
    SectorFormComponent,
    SectorListComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SectorRoutingModule,
    SharedModule,
    NgxPaginationModule,
    TableModule,
    TooltipModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SectorModule { }
