import { NgModule, Type } from '@angular/core';
import { NormalButtonConfigurationComponent } from './components/normal-button-configuration/normal-button-configuration.component';
import { CommonModule as ShareCommonModule } from 'victor-editor-shared/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ComponentDesignTimeModule } from 'victor-core';

@NgModule({
  declarations: [
    NormalButtonConfigurationComponent
  ],
  imports: [
    ShareCommonModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzTabsModule
  ]
})
export class DesignTimeModule implements ComponentDesignTimeModule {

  getComponentType(type: string): Type<any> {
    switch (type) {
      case 'button':
        return NormalButtonConfigurationComponent;
      default:
        return null;
    }
  }
}
