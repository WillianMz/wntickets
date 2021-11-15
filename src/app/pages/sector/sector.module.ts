import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorRoutingModule } from './sector-routing.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { SectorFormComponent } from './sector-form/sector-form.component';
import { SectorListComponent } from './sector-list/sector-list.component';
import { CategoryListComponent } from './category-list/category-list.component';


@NgModule({
  declarations: [
    CategoryFormComponent,
    SectorFormComponent,
    SectorListComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    SectorRoutingModule,
    SharedModule
  ]
})
export class SectorModule { }
