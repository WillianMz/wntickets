import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadComponent } from './load/load.component';
import { AlertComponent } from './alert/alert.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './not-found/not-found.component';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';

@NgModule({
  declarations: [
    LoadComponent,
    AlertComponent,
    NavbarComponent,
    NotfoundComponent,
    AcessoNegadoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxSpinnerModule
  ],
  exports: [
    LoadComponent,
    AlertComponent,
    NavbarComponent,
    NotfoundComponent,
    AcessoNegadoComponent
  ]
})
export class ComponentsModule {}
