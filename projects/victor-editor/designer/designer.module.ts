import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerComponent } from './components/designer/designer.component';
import { OptionalComponentPanelComponent } from './components/optional-component-panel/optional-component-panel.component';
import { PagePresentationComponent } from './components/page-presentation/page-presentation.component';
import { DropContainerModule } from 'victor-editor/drop-container';
import { ComponentSettingPanelComponent } from './components/component-setting-panel/component-setting-panel.component';
import { StateStoreModule } from 'victor-editor/state-store';
import { DynamicComponentRegistryService } from './services/dynamic-component-registry.service';
import { COMPONENT_DESIGN_PANEL_REGISTRY, COMPONENT_ID_GENERATOR, CUSTOM_RENDER_PROVIDER, DYNAMIC_COMPONENT_REGISTRY, DYNAMIC_COMPONENT_RENDERER } from 'victor-core';
import { DynamicComponentRendererService } from './services/dynamic-component-renderer.service';
import { ComponentDesignPanelRegistryService } from './services/component-design-panel-registry.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CustomRenderProviderService } from './services/custom-render-provider.service';
import { ComponentIdGeneratorService } from './services/component-id-generator.service';

@NgModule({
  declarations: [
    DesignerComponent,
    OptionalComponentPanelComponent,
    PagePresentationComponent,
    ComponentSettingPanelComponent
  ],
  imports: [
    CommonModule,
    DropContainerModule,
    NzButtonModule,
    StateStoreModule
  ],
  providers: [
    { provide: COMPONENT_ID_GENERATOR, useClass: ComponentIdGeneratorService },
    { provide: CUSTOM_RENDER_PROVIDER, useClass: CustomRenderProviderService },
    { provide: DYNAMIC_COMPONENT_REGISTRY, useClass: DynamicComponentRegistryService },
    { provide: DYNAMIC_COMPONENT_RENDERER, useClass: DynamicComponentRendererService },
    { provide: COMPONENT_DESIGN_PANEL_REGISTRY, useClass: ComponentDesignPanelRegistryService },
  ],
  exports: [
    DesignerComponent
  ]
})
export class DesignerModule { }
