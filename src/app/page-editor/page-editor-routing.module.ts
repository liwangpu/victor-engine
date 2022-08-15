import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicPageComponent } from './components/dynamic-page/dynamic-page.component';
import { PageEditorComponent } from './components/page-editor/page-editor.component';
import { PageListComponent } from './components/page-list/page-list.component';
import { PageDefinitionResolver } from './services/page-definition.resolver';
import { PageListPreviewGuard } from './services/page-list-preview.guard';

const routes: Routes = [
  {
    path: 'list',
    component: PageListComponent,
    children: [
      {
        path: 'dynamic/:id',
        component: DynamicPageComponent,
        resolve: {
          definition: PageDefinitionResolver
        }
      }
    ],
    canActivate: [
      PageListPreviewGuard
    ]
  },
  {
    path: 'editor/:id',
    component: PageEditorComponent,
    resolve: {
      schema: PageDefinitionResolver
    }
  },
  { path: '', pathMatch: 'full', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageEditorRoutingModule { }
