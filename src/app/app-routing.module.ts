import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'config',
    loadChildren: () => import('./modules/config/config.module').then(m => m.ConfigModule)
  },
  {
    path:'equipment',
    loadChildren: () => import('./modules/equipment/equipment.module').then(m => m.EquipmentModule)
  },
  {
    path:'equip-type',
    loadChildren: () => import('./modules/equipment/equip-type/equip-type.module').then(m => m.EquipmentTypeModule)
  },
  {
    path:'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path:'notification',
    loadChildren: () =>  import('./modules/notifications/notifications.module').then(m => m.NotificationsModule)
  },
  {
    path:'labs',
    loadChildren: () => import('./modules/sector/sector.module').then(m => m.SectorModule)
  },
  {
    path:'ticket',
    loadChildren: () => import('./modules/ticket/ticket.module').then(m => m.TicketModule)
  },
  {
    path:'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  { path: '404', component: NotfoundComponent },
  //{ path: '', redirectTo: '404', pathMatch: 'full'},
  { path: '**', redirectTo: '404'},
  { path: '#', redirectTo: 'home'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
