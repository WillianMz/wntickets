import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketOpenComponent } from './ticket-open/ticket-open.component';
import { CommentsComponent } from './comments/comments.component';
import { HistoricFormComponent } from './historic-form/historic-form.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [
    TicketFormComponent,
    TicketListComponent,
    TicketOpenComponent,
    CommentsComponent,
    HistoricFormComponent,
    AttachmentsComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    SharedModule,
    TabsModule
  ]
})
export class TicketModule { }
