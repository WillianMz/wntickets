import { TicketModule } from './../ticket/ticket.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashUserComponent } from './dash-user/dash-user.component';
import { DashAdminComponent } from './dash-admin/dash-admin.component';
import { DashSupportComponent } from './dash-support/dash-support.component';
import { DashManagerComponent } from './dash-manager/dash-manager.component';
import { ComponentsModule } from 'src/app/components/components.module';
import {TabViewModule} from 'primeng/tabview';


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
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    TabViewModule,
    TicketModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule { }
