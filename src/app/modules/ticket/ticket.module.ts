import { ComponentsModule } from './../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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

import { TableModule } from 'ngx-easy-table';
import { TicketOpenComponent } from './ticket-open/ticket-open.component';


@NgModule({
  declarations: [
    OpenTicketComponent,
    TicketHistoryComponent,
    TicketListComponent,
    TicketCancelComponent,
    TicketFinalizeComponent,
    TicketAttachmentsComponent,
    TicketCommentsComponent,
    TicketFormComponent,
    TicketOpenComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    TableModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TicketModule { }
