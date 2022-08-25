import { ComponentFactoryResolver, Inject, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NormalButtonConfigurationComponent } from './components/normal-button-configuration/normal-button-configuration.component';
import { ComponentDesignPanelRegistry, COMPONENT_DESIGN_PANEL_REGISTRY } from 'victor-core';
import { DesignerSharedModule } from 'victor-core/designer-shared';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTabsModule } from 'ng-zorro-antd/tabs';



@NgModule({
  declarations: [
    NormalButtonConfigurationComponent
  ],
  imports: [
    DesignerSharedModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzTabsModule
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
        type: 'button',
        fac: cfr.resolveComponentFactory(NormalButtonConfigurationComponent)
      });
    }
  }
}
