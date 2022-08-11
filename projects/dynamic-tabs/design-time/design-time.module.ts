import { ComponentFactoryResolver, Inject, NgModule, Optional } from '@angular/core';
import { ComponentDesignPanelRegistry, COMPONENT_DESIGN_PANEL_REGISTRY } from 'victor-core';
import { TabsSettingComponent } from './components/tabs-setting/tabs-setting.component';
import { DesignerSharedModule } from 'victor-core/designer-shared';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TabsConfigPanelComponent } from './components/tabs-config-panel/tabs-config-panel.component';

@NgModule({
  declarations: [
    TabsSettingComponent,
    TabsConfigPanelComponent
  ],
  imports: [
    DesignerSharedModule,
    NzInputModule,
    NzButtonModule
  ]
})
export class DesignTimeModule {
  constructor(
    @Optional()
    @Inject(COMPONENT_DESIGN_PANEL_REGISTRY)
    designPanelRegistry: ComponentDesignPanelRegistry,
    cfr: ComponentFactoryResolver
  ) {
    if (designPanelRegistry) {
      designPanelRegistry.registry({
        type: 'tabs',
        fac: cfr.resolveComponentFactory(TabsConfigPanelComponent)
      });
    }
  }
}
