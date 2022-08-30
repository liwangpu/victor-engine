import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./page-editor/page-editor.module').then(m => m.PageEditorModule)
  },
  {
    path: 'victor-form',
    loadChildren: () => import('./victor-form/victor-form.module').then(m => m.VictorFormModule)
  },
  {
    path: 'custom-market',
    loadChildren: () => import('./custom-market/custom-market.module').then(m => m.CustomMarketModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'pages' },
  { path: '**', redirectTo: 'pages' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
