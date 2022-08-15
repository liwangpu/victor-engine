import { ComponentFactoryResolver, Inject, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowLayoutComponent } from './components/row-layout/row-layout.component';
import { DesignerSharedModule } from 'victor-core/designer-shared';
import { ComponentDesignPanelRegistry, COMPONENT_DESIGN_PANEL_REGISTRY, DynamicComponentRegistry, DYNAMIC_COMPONENT_REGISTRY, PartialComponentMetadata } from 'victor-core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutWrapperComponent } from './components/layout-wrapper/layout-wrapper.component';
import { RowLayoutConfigurationComponent } from './components/row-layout-configuration/row-layout-configuration.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';
import { RowLayoutContainerComponent } from './components/row-layout-container/row-layout-container.component';
import * as shortid from 'shortid';

@NgModule({
  declarations: [
    RowLayoutComponent,
    LayoutWrapperComponent,
    RowLayoutConfigurationComponent,
    RowLayoutContainerComponent
  ],
  imports: [
    DesignerSharedModule,
    NzInputNumberModule,
    NzInputModule
  ]
})
export class FlexLayoutModule {
  constructor(
    @Optional()
    @Inject(DYNAMIC_COMPONENT_REGISTRY)
    componentRegistry: DynamicComponentRegistry,
    @Optional()
    @Inject(COMPONENT_DESIGN_PANEL_REGISTRY)
    designPanelRegistry: ComponentDesignPanelRegistry,
    cfr: ComponentFactoryResolver,
    translater: TranslateService
  ) {
    if (componentRegistry) {
      componentRegistry.registry({
        type: 'flex-row-layout',
        title: '横向布局',
        group: 'container',
        fac: cfr.resolveComponentFactory(RowLayoutComponent),
        metadataProvider: async (partial: PartialComponentMetadata) => ({
          body: [
            {
              id: `${shortid.generate()}`,
              type: 'row-layout-container',
              title: 'row layout'
            }
          ]
        })
      });

      componentRegistry.registry({
        type: 'row-layout-container',
        title: 'row-layout-container',
        fac: cfr.resolveComponentFactory(RowLayoutContainerComponent)
      });
    }

    if (designPanelRegistry) {
      designPanelRegistry.registry({
        type: 'flex-row-layout',
        fac: cfr.resolveComponentFactory(RowLayoutConfigurationComponent)
      });
    }
  }
}
