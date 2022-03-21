import { ComponentsModule } from './../../components/components.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardFormComponent } from './dashboard-form/dashboard-form.component';

import { TableModule } from 'ngx-easy-table';

@NgModule({
  declarations: [
    DashboardFormComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TableModule,
    ComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
