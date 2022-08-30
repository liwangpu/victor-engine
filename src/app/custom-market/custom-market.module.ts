import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMarketRoutingModule } from './custom-market-routing.module';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [
    ComponentListComponent
  ],
  imports: [
    CommonModule,
    CustomMarketRoutingModule,
    NzTableModule
  ]
})
export class CustomMarketModule { }
