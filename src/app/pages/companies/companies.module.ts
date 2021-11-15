import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyListComponent } from './company-list/company-list.component';



@NgModule({
  declarations: [
    CompanyFormComponent,
    CompanyListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CompaniesModule { }
