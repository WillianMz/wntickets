import { TicketListColComponent } from './ticket-list-col/ticket-list-col.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { TicketOpenComponent } from './ticket-open/ticket-open.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: TicketListComponent },
  { path: 'new', component: TicketOpenComponent },
  { path: 'edit/:id', component: TicketFormComponent},
  { path: 'ticket/:id', component: TicketFormComponent},

  { path: 'col', component: TicketListColComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
