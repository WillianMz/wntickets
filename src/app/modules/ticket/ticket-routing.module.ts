import { TicketHistoryComponent } from './ticket-history/ticket-history.component';
import { TicketFinalizeComponent } from './ticket-finalize/ticket-finalize.component';
import { TicketCommentsComponent } from './ticket-comments/ticket-comments.component';
import { TicketCancelComponent } from './ticket-cancel/ticket-cancel.component';
import { TicketAttachmentsComponent } from './ticket-attachments/ticket-attachments.component';
import { OpenTicketComponent } from './open-ticket/open-ticket.component';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path:'', component: TicketListComponent },
  { path:'new', component: OpenTicketComponent },
  { path:'edit/:id', component: TicketFormComponent },
  { path:'detail', component: TicketFormComponent },
  { path:'attachments', component: TicketAttachmentsComponent },
  { path:'cancel', component: TicketCancelComponent },
  { path:'comments', component: TicketCommentsComponent },
  { path:'finalize', component: TicketFinalizeComponent },
  { path:'history', component: TicketHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
