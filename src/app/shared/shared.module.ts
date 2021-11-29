import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AlertNadaExibirComponent } from './alert-nada-exibir/alert-nada-exibir.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    MenuComponent,
    SidebarComponent,
    AlertNadaExibirComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    MenuComponent,
    SidebarComponent,
    AlertNadaExibirComponent,
    FooterComponent
  ]
})
export class SharedModule { }
