import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule
  ]
})
export class NotificationsModule { }
