import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigItemComponent } from './components/config-item/config-item.component';
import { EventBindingConfigComponent } from './components/event-binding-config/event-binding-config.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { EventAddingSettingComponent } from './components/event-binding-config/event-adding-setting/event-adding-setting.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { IconDefinition } from '@ant-design/icons-angular';
import * as antIcon from '@ant-design/icons-angular/icons';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ComponentSizeConfigComponent } from './components/component-size-config/component-size-config.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

const icons: Array<IconDefinition> = [antIcon.LinkOutline, antIcon.PlusOutline];

@NgModule({
  declarations: [
    ConfigItemComponent,
    EventBindingConfigComponent,
    EventAddingSettingComponent,
    ComponentSizeConfigComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzSelectModule,
    NzInputNumberModule,
    NzInputModule,
    NzIconModule.forChild(icons),
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    NzInputNumberModule,
    ConfigItemComponent,
    EventBindingConfigComponent,
    ComponentSizeConfigComponent
  ]
})
export class DesignerSharedModule { }
