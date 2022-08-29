import { NgModule, Type } from '@angular/core';
import { TextConfigPanelComponent } from './components/text-config-panel/text-config-panel.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ComponentDesignPanel, ComponentDesignTimeModule } from 'victor-core';
import { CommonModule as ShareCommonModule } from 'victor-editor-shared/common';
import { TextValidatorComponent } from './components/text-validator/text-validator.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@NgModule({
  declarations: [
    TextConfigPanelComponent,
    TextValidatorComponent
  ],
  imports: [
    ShareCommonModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzInputNumberModule
  ]
})
export class DesignTimeModule implements ComponentDesignTimeModule {

  getComponentType(type: string): Type<ComponentDesignPanel> {
    switch (type) {
      case 'text':
        return TextConfigPanelComponent;
      default:
        return null;
    }
  }
}
