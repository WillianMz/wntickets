import { TicketOpenComponent } from './ticket-open/ticket-open.component';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path:'', component: TicketListComponent },
  { path:'open', component: TicketOpenComponent },
  { path:':id/edit', component: TicketFormComponent },
  { path:'detail', component: TicketFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
