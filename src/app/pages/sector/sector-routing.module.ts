import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { SectorFormComponent } from './sector-form/sector-form.component';
import { SectorListComponent } from './sector-list/sector-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component:  SectorListComponent },
  { path: 'new', component: SectorFormComponent },
  { path: ':id/edit', component: SectorFormComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'category/new', component: CategoryFormComponent },
  { path: 'category/:id/edit', component: CategoryFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectorRoutingModule { }
