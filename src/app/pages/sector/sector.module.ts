import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorRoutingModule } from './sector-routing.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { SectorFormComponent } from './sector-form/sector-form.component';
import { SectorListComponent } from './sector-list/sector-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { TableModule } from 'ngx-easy-table';

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
    TableModule
  ]
})
export class SectorModule { }
