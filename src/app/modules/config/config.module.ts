import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { ConfigCompanyComponent } from './config-company/config-company.component';
import { ConfigSystemComponent } from './config-system/config-system.component';
import { ConfigAppComponent } from './config-app/config-app.component';
import { ConfigPageComponent } from './config-page/config-page.component';


@NgModule({
  declarations: [
    ConfigCompanyComponent,
    ConfigSystemComponent,
    ConfigAppComponent,
    ConfigPageComponent
  ],
  imports: [
    CommonModule,
    ConfigRoutingModule
  ]
})
export class ConfigModule { }
