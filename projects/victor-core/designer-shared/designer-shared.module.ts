import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigItemComponent } from './components/config-item/config-item.component';
import { EventBindingConfigComponent } from './components/event-binding-config/event-binding-config.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { EventAddingSettingComponent } from './components/event-binding-config/event-adding-setting/event-adding-setting.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [
    ConfigItemComponent,
    EventBindingConfigComponent,
    EventAddingSettingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    ConfigItemComponent,
    EventBindingConfigComponent
  ]
})
export class DesignerSharedModule { }
