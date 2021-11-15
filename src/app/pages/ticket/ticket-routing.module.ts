import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { TicketOpenComponent } from './ticket-open/ticket-open.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: TicketListComponent },
  { path: 'new', component: TicketOpenComponent },
  { path: 'edit/:id', component: TicketFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
