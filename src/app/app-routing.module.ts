import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'page-editor',
    loadChildren: () => import('./page-editor/page-editor.module').then(m => m.PageEditorModule)
  },
  // {
  //   path: 'form-designer',
  //   loadChildren: () => import('./module-loaders/designer-loader/designer-loader.module').then(m => m.DesignerLoaderModule)
  // },
  { path: '', pathMatch: 'full', redirectTo: 'page-editor' },
  { path: '**', redirectTo: 'page-editor' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
