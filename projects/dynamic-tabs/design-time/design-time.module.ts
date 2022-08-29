import { NgModule, Type } from '@angular/core';
import { TabsSettingComponent } from './components/tabs-setting/tabs-setting.component';
import { CommonModule as ShareCommonModule } from 'victor-editor-shared/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TabsConfigPanelComponent } from './components/tabs-config-panel/tabs-config-panel.component';
import { ComponentDesignPanel, ComponentDesignTimeModule } from 'victor-core';

@NgModule({
  declarations: [
    TabsSettingComponent,
    TabsConfigPanelComponent
  ],
  imports: [
    ShareCommonModule,
    NzInputModule,
    NzButtonModule
  ]
})
export class DesignTimeModule implements ComponentDesignTimeModule {

  getComponentType(type: string): Type<ComponentDesignPanel> {
    switch (type) {
      case 'tabs':
        return TabsConfigPanelComponent;
      default:
        return null;
    }
  }
}