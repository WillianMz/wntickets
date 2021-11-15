import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketOpenComponent } from './ticket-open/ticket-open.component';


@NgModule({
  declarations: [
    TicketFormComponent,
    TicketListComponent,
    TicketOpenComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule
  ]
})
export class TicketModule { }
