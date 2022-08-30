import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMarketRoutingModule } from './custom-market-routing.module';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ComponentEditComponent } from './components/component-edit/component-edit.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as antIcon from '@ant-design/icons-angular/icons';

const icons: Array<IconDefinition> = [];

@NgModule({
  declarations: [
    ComponentListComponent,
    ComponentEditComponent
  ],
  imports: [
    CommonModule,
    CustomMarketRoutingModule,
    NzIconModule.forChild(icons),
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
  ]
})
export class CustomMarketModule { }
