import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./page-editor/page-editor.module').then(m => m.PageEditorModule)
  },
  {
    path: 'victor-form-demo',
    loadChildren: () => import('./victor-form-demo/victor-form-demo.module').then(m => m.VictorFormDemoModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'pages' },
  { path: '**', redirectTo: 'pages' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
