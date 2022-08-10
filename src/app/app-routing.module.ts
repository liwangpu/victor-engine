import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./page-editor/page-editor.module').then(m => m.PageEditorModule)
  },
  // {
  //   path: 'victor-editor',
  //   loadChildren: () => import('./module-loaders/designer-loader/designer-loader.module').then(m => m.DesignerLoaderModule)
  // },
  { path: '', pathMatch: 'full', redirectTo: 'pages' },
  { path: '**', redirectTo: 'pages' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
