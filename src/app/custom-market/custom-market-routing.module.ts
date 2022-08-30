import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentListComponent } from './components/component-list/component-list.component';

const routes: Routes = [
  {
    path: 'component-list',
    component: ComponentListComponent
  },
  { path: '', pathMatch: 'full', redirectTo: 'component-list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomMarketRoutingModule { }
