import { ComponentFactoryResolver, Inject, NgModule, Optional } from '@angular/core';
import { TextConfigPanelComponent } from './components/text-config-panel/text-config-panel.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ComponentDesignPanelRegistry, COMPONENT_DESIGN_PANEL_REGISTRY } from 'victor-core';
import { DesignerSharedModule } from 'victor-core/designer-shared';
import { TextValidatorComponent } from './components/text-validator/text-validator.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@NgModule({
  declarations: [
    TextConfigPanelComponent,
    TextValidatorComponent
  ],
  imports: [
    DesignerSharedModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzInputNumberModule
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
