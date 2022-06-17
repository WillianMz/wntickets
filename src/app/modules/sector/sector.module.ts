import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorRoutingModule } from './sector-routing.module';
import { SectorFormComponent } from './sector-form/sector-form.component';
import { SectorListComponent } from './sector-list/sector-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';


@NgModule({
  declarations: [
    SectorFormComponent,
    SectorListComponent,
    CategoryListComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    SectorRoutingModule
  ]
})
export class SectorModule { }
