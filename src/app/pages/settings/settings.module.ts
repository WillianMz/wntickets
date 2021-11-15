import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration/configuration.component';
import { UserConfigComponent } from './user-config/user-config.component';



@NgModule({
  declarations: [
    ConfigurationComponent,
    UserConfigComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SettingsModule { }
