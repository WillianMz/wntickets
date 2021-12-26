import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyListComponent } from './company-list/company-list.component';

const routes: Routes = [
  { path: '', component: CompanyListComponent },
  { path: 'new', component: CompanyFormComponent },
  { path: ':id/edit', component: CompanyFormComponent },
  { path: ':id', component: CompanyProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
