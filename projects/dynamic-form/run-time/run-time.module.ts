import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent } from './components/text/text.component';
import { ComponentRunTimeModule, DynamicComponent } from 'victor-core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconDefinition } from '@ant-design/icons-angular';
import * as antIcon from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

const icons: Array<IconDefinition> = [antIcon.CloseCircleOutline];

@NgModule({
  declarations: [
    TextComponent
  ],
  imports: [
    CommonModule,
    NzInputModule,
    ReactiveFormsModule,
    FormsModule,
    NzIconModule.forChild(icons),
  ]
})
export class RunTimeModule implements ComponentRunTimeModule {

  getComponentType(type: string): Type<DynamicComponent> {
    switch (type) {
      case 'text':
        return TextComponent;
      default:
        return null;
    }
  }
}
