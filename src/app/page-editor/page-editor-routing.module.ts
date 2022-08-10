import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicPageComponent } from './components/dynamic-page/dynamic-page.component';
import { PageEditorComponent } from './components/page-editor/page-editor.component';
import { PageListComponent } from './components/page-list/page-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: PageListComponent,
    children: [
      {
        path: 'dynamic/:id',
        component: DynamicPageComponent
      }
    ]
  },
  {
    path: 'editor',
    component: PageEditorComponent
  },
  {
    path: 'editor/:id',
    component: PageEditorComponent
  },
  { path: '', pathMatch: 'full', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageEditorRoutingModule { }
