import { AcessoNegadoComponent } from './components/acesso-negado/acesso-negado.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthenticationComponent } from './layouts/authentication/authentication.component';
import { HomeComponent } from './layouts/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { 
        path:'home', 
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      },
      { path:'labs', loadChildren: () => import('./modules/sector/sector.module').then(m => m.SectorModule)},
      { path:'equipment', loadChildren: () => import('./modules/equipment/equipment.module').then(m => m.EquipmentModule)},
      { path:'ticket', loadChildren: () => import('./modules/ticket/ticket.module').then(m => m.TicketModule)},
      { path:'users', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)},
      { path: '', redirectTo: 'home', pathMatch: 'full'},
    ],
    
  },
  {
    path:'',
    component: AuthenticationComponent,
    children: [
      { path:'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)}
    ]
  },
  { path: '404', component: NotfoundComponent },
  { path: 'acesso-negado', component: AcessoNegadoComponent},
  { path: '', redirectTo: '404', pathMatch: 'full'},
  { path: '**', redirectTo: '404'},
  { path: '#', redirectTo: 'home'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
