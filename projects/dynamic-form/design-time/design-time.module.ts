import { ComponentFactoryResolver, Inject, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextConfigPanelComponent } from './components/text-config-panel/text-config-panel.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ComponentDesignPanelRegistry, COMPONENT_DESIGN_PANEL_REGISTRY } from 'victor-core';
import { DesignerSharedModule } from 'victor-core/designer-shared';


@NgModule({
  declarations: [
    TextConfigPanelComponent
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
        type: 'text',
        fac: cfr.resolveComponentFactory(TextConfigPanelComponent)
      });
    }
  }
}
