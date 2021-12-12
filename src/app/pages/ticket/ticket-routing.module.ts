import { AttachmentsComponent } from './attachments/attachments.component';
import { HistoricFormComponent } from './historic-form/historic-form.component';
import { CommentsComponent } from './comments/comments.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { TicketOpenComponent } from './ticket-open/ticket-open.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: TicketListComponent },
  { path: 'new', component: TicketOpenComponent },
  { path: 'edit/:id', component: TicketFormComponent },
  { path: 'ticket/:id', component: TicketFormComponent },
  { path: ':idTicket/comments', component: CommentsComponent },
  { path: ':idTicket/historic', component: HistoricFormComponent },
  { path: ':idTicket/attachments', component: AttachmentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
