import { ComponentsModule } from './../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketRoutingModule } from './ticket-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { TableModule } from 'ngx-easy-table';
import { TicketOpenComponent } from './ticket-open/ticket-open.component';
import {TabViewModule} from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    TicketListComponent,
    TicketFormComponent,
    TicketOpenComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    TableModule,
    TabViewModule,
    ConfirmDialogModule
  ],
  providers: [
    ConfirmationService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TicketModule { }
