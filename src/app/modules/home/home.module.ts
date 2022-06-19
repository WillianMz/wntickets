import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashUserComponent } from './dash-user/dash-user.component';
import { DashAdminComponent } from './dash-admin/dash-admin.component';
import { DashSupportComponent } from './dash-support/dash-support.component';
import { DashManagerComponent } from './dash-manager/dash-manager.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashUserComponent,
    DashAdminComponent,
    DashSupportComponent,
    DashManagerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
