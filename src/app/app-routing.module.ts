import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'companies',
    loadChildren: () => import('./pages/companies/companies.module').then(m => m.CompaniesModule)
  },
  {
    path: 'dashbord',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'sectors',
    loadChildren: () => import('./pages/sector/sector.module').then(m => m.SectorModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'tickets',
    loadChildren: () => import('./pages/ticket/ticket.module').then(m => m.TicketModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
