import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketOpenComponent } from './ticket-open/ticket-open.component';
import { TicketListColComponent } from './ticket-list-col/ticket-list-col.component';


@NgModule({
  declarations: [
    TicketFormComponent,
    TicketListComponent,
    TicketOpenComponent,
    TicketListColComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    SharedModule
  ]
})
export class TicketModule { }
