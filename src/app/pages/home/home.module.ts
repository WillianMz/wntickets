import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
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
    SharedModule,
    TableModule
  ]
})
export class HomeModule { }
