import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
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
    component: AdminLayoutComponent,
    loadChildren: () => import('./pages/company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'home',
    component: AdminLayoutComponent,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'sectors',
    component: AdminLayoutComponent,
    loadChildren: () => import('./pages/sector/sector.module').then(m => m.SectorModule)
  },
  {
    path: 'settings',
    component: AdminLayoutComponent,
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'tickets',
    component: AdminLayoutComponent,
    loadChildren: () => import('./pages/ticket/ticket.module').then(m => m.TicketModule)
  },
  {
    path: 'users',
    component: AdminLayoutComponent,
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
