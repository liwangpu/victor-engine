import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDefinition } from '@ant-design/icons-angular';
import * as antIcon from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ButtonComponent } from './components/button/button.component';
import { ComponentRunTimeModule, DynamicComponent } from 'victor-core';
import { NzButtonModule } from 'ng-zorro-antd/button';

const icons: Array<IconDefinition> = [antIcon.CloseCircleOutline];

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule.forChild(icons),
  ]
})
export class RunTimeModule implements ComponentRunTimeModule {

  getComponentType(type: string): Type<DynamicComponent> {
    switch (type) {
      case 'button':
        return ButtonComponent;
      default:
        return null;
    }
  }
}
