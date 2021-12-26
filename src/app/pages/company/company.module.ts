import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { CompanyProfileComponent } from './company-profile/company-profile.component';

@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyFormComponent,
    CompanyProfileComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule,
    PopoverModule
  ]
})
export class CompanyModule { }
