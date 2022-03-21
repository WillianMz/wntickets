import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ConfigurationFormComponent } from './configuration-form/configuration-form.component';


@NgModule({
  declarations: [
    ConfigurationFormComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ComponentsModule
  ]
})
export class SettingsModule { }
