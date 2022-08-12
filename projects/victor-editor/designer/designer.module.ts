import { ComponentFactoryResolver, Inject, NgModule, Optional } from '@angular/core';
import { DesignerComponent } from './components/designer/designer.component';
import { OptionalComponentPanelComponent } from './components/optional-component-panel/optional-component-panel.component';
import { PagePresentationComponent } from './components/page-presentation/page-presentation.component';
import { DropContainerModule } from 'victor-editor/drop-container';
import { ComponentSettingPanelComponent } from './components/component-setting-panel/component-setting-panel.component';
import { StateStoreModule } from 'victor-editor/state-store';
import { ComponentDesignPanelRegistry, COMPONENT_DESIGN_PANEL_REGISTRY, COMPONENT_ID_GENERATOR } from 'victor-core';
import { ComponentDesignPanelRegistryService } from './services/component-design-panel-registry.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ComponentIdGeneratorService } from './services/component-id-generator.service';
import { PageSettingPanelComponent } from './components/page-setting-panel/page-setting-panel.component';
import { DesignerSharedModule } from 'victor-core/designer-shared';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@NgModule({
  declarations: [
    DesignerComponent,
    OptionalComponentPanelComponent,
    PagePresentationComponent,
    ComponentSettingPanelComponent,
    PageSettingPanelComponent
  ],
  imports: [
    DesignerSharedModule,
    DropContainerModule,
    StateStoreModule,
    NzButtonModule,
    NzInputModule,
    NzEmptyModule,
  ],
  providers: [
    { provide: COMPONENT_ID_GENERATOR, useClass: ComponentIdGeneratorService },
    { provide: COMPONENT_DESIGN_PANEL_REGISTRY, useClass: ComponentDesignPanelRegistryService },
  ],
  exports: [
    DesignerComponent
  ]
})
export class DesignerModule {

  constructor(
    @Optional()
    @Inject(COMPONENT_DESIGN_PANEL_REGISTRY)
    designPanelRegistry: ComponentDesignPanelRegistry,
    cfr: ComponentFactoryResolver
  ) {
    if (designPanelRegistry) {
      designPanelRegistry.registry({
        type: 'page',
        fac: cfr.resolveComponentFactory(PageSettingPanelComponent)
      });
    }
  }
  
}
