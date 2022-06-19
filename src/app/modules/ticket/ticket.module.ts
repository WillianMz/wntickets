import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { OpenTicketComponent } from './open-ticket/open-ticket.component';
import { TicketHistoryComponent } from './ticket-history/ticket-history.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketCancelComponent } from './ticket-cancel/ticket-cancel.component';
import { TicketFinalizeComponent } from './ticket-finalize/ticket-finalize.component';
import { TicketAttachmentsComponent } from './ticket-attachments/ticket-attachments.component';
import { TicketCommentsComponent } from './ticket-comments/ticket-comments.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';


@NgModule({
  declarations: [
    OpenTicketComponent,
    TicketHistoryComponent,
    TicketListComponent,
    TicketCancelComponent,
    TicketFinalizeComponent,
    TicketAttachmentsComponent,
    TicketCommentsComponent,
    TicketFormComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule
  ]
})
export class TicketModule { }
