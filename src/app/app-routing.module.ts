import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'sectors', loadChildren: () => import('./pages/sector/sector.module').then(m => m.SectorModule) },
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule) },
  { path: 'tickets', loadChildren: () => import('./pages/ticket/ticket.module').then(m => m.TicketModule) },
  { path: 'users', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
  { path: '404', component: NotfoundComponent },
  //{ path: '', redirectTo: '404', pathMatch: 'full'},
  { path: '**', redirectTo: '404'},
  { path: '#', redirectTo: 'home'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
