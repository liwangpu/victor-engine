import { NgModule } from '@angular/core';
import { DesignerComponent } from './components/designer/designer.component';
import { OptionalComponentPanelComponent } from './components/optional-component-panel/optional-component-panel.component';
import { PagePresentationComponent } from './components/page-presentation/page-presentation.component';
import { DropContainerModule } from 'victor-editor/drop-container';
import { ComponentSettingPanelComponent } from './components/component-setting-panel/component-setting-panel.component';
import { StateStoreModule } from 'victor-editor/state-store';
import { ComponentDiscoveryService, COMPONENT_ID_GENERATOR, DYNAMIC_COMPONENT_RENDERER } from 'victor-core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ComponentIdGeneratorService } from './services/component-id-generator.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { DynamicComponentRendererService } from './services/dynamic-component-renderer.service';
import { CommonModule as ShareCommonModule } from 'victor-editor-shared/common';

@NgModule({
  declarations: [
    DesignerComponent,
    OptionalComponentPanelComponent,
    PagePresentationComponent,
    ComponentSettingPanelComponent,
    // PageSettingPanelComponent
  ],
  imports: [
    ShareCommonModule,
    DropContainerModule,
    StateStoreModule,
    NzButtonModule,
    NzInputModule,
    NzEmptyModule,
  ],
  providers: [
    ComponentDiscoveryService,
    { provide: COMPONENT_ID_GENERATOR, useClass: ComponentIdGeneratorService },
    { provide: DYNAMIC_COMPONENT_RENDERER, useClass: DynamicComponentRendererService },
    // { provide: COMPONENT_DESIGN_PANEL_REGISTRY, useClass: ComponentDesignPanelRegistryService },
  ],
  exports: [
    DesignerComponent
  ]
})
export class DesignerModule {

  // constructor(
  //   @Optional()
  //   @Inject(COMPONENT_DESIGN_PANEL_REGISTRY)
  //   designPanelRegistry: ComponentDesignPanelRegistry,
  //   cfr: ComponentFactoryResolver
  // ) {
  //   if (designPanelRegistry) {
  //     designPanelRegistry.registry({
  //       type: 'page',
  //       fac: cfr.resolveComponentFactory(PageSettingPanelComponent)
  //     });
  //   }
  // }

}
