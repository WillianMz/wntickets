import { AuthUserActivateComponent } from './modules/auth/auth-user-activate/auth-user-activate.component';
import { AuthRegisterComponent } from './modules/auth/auth-register/auth-register.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthenticationComponent } from './layouts/authentication/authentication.component';
import { HomeComponent } from './layouts/home/home.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  //NOVO
  {
    path:'',
    component: HomeComponent, 
    children: [
      { path:'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
      { path:'labs', loadChildren: () => import('./modules/sector/sector.module').then(m => m.SectorModule)},
      { path:'equipment', loadChildren: () => import('./modules/equipment/equipment.module').then(m => m.EquipmentModule)},
      { path:'ticket', loadChildren: () => import('./modules/ticket/ticket.module').then(m => m.TicketModule)},
      { path:'users', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)},
      { path: '', redirectTo: 'home', pathMatch: 'full'},
    ],
    canActivate: [AuthGuard]
  },
  {
    path:'',
    component: AuthenticationComponent,
    children: [
      { path:'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
      /* { path:'nova-conta', component: AuthRegisterComponent },
      { path:'ativar-conta', component: AuthUserActivateComponent } */

    ]
  },
  { path: '404', component: NotfoundComponent },
  { path: '', redirectTo: '404', pathMatch: 'full'},
  { path: '**', redirectTo: '404'},
  { path: '#', redirectTo: 'home'},

  /* {
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
  { path: '#', redirectTo: 'home'}, */
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
