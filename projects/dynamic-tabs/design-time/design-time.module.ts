import { ComponentFactoryResolver, Inject, NgModule } from '@angular/core';
import { ConfigPanelComponent } from './components/config-panel/config-panel.component';
import { ComponentDesignPanelRegistry, COMPONENT_DESIGN_PANEL_REGISTRY } from 'victor-core';
import { TabsSettingComponent } from './components/tabs-setting/tabs-setting.component';
import { DesignerSharedModule } from 'victor-core/designer-shared';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    ConfigPanelComponent,
    TabsSettingComponent
  ],
  imports: [
    DesignerSharedModule,
    NzInputModule,
    NzButtonModule
  ]
})
export class DesignTimeModule {
  constructor(
    @Inject(COMPONENT_DESIGN_PANEL_REGISTRY)
    designPanelRegistry: ComponentDesignPanelRegistry,
    cfr: ComponentFactoryResolver
  ) {
    designPanelRegistry.registry({
      type: 'tabs',
      fac: cfr.resolveComponentFactory(ConfigPanelComponent)
    });
  }
}
