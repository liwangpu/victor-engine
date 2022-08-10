import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageListComponent } from './components/page-list/page-list.component';

const routes: Routes = [
  {
    path: 'page-list',
    component: PageListComponent
  },
  { path: '', pathMatch: 'full', redirectTo: 'page-list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageEditorRoutingModule { }
