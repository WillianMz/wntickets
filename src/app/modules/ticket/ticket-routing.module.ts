import { TicketAnexoComponent } from './ticket-anexo/ticket-anexo.component';
import { TicketOpenComponent } from './ticket-open/ticket-open.component';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { 
    path:'',
    canActivate: [AuthGuard],
    component: TicketListComponent,
    data: {
      roles: ['Usuario','Suporte','Gerente','Admin']
    }
  },
  { 
    path:'open',
    canActivate: [AuthGuard],
    component: TicketOpenComponent,
    data: {
      roles: ['Usuario','Suporte','Gerente','Admin']
    }
  },
  { 
    path:':id/edit',
    canActivate: [AuthGuard],
    component: TicketFormComponent,
    data: {
      roles: ['Suporte','Gerente','Admin']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
