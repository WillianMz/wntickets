import { SharedModule } from './../../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketOpenComponent } from './ticket-open/ticket-open.component';
import { CommentsComponent } from './comments/comments.component';
import { HistoricFormComponent } from './historic-form/historic-form.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { TableModule } from 'ngx-easy-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    TabsModule,
    TableModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketModule { }
