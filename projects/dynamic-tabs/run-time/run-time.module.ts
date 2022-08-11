import { ComponentFactoryResolver, Inject, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentIdGenerator, COMPONENT_ID_GENERATOR, DynamicComponentRegistry, DYNAMIC_COMPONENT_REGISTRY, PartialComponentMetadata } from 'victor-core';
import { TabsComponent } from './components/tabs/tabs.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TabComponent } from './components/tab/tab.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TabWrapperComponent } from './components/tab-wrapper/tab-wrapper.component';

@NgModule({
  declarations: [
    TabsComponent,
    TabComponent,
    TabWrapperComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    NzTabsModule
  ]
})
export class RunTimeModule {
  constructor(
    @Optional()
    @Inject(DYNAMIC_COMPONENT_REGISTRY)
    componentRegistry: DynamicComponentRegistry,
    @Inject(COMPONENT_ID_GENERATOR)
    idGenerator: ComponentIdGenerator,
    cfr: ComponentFactoryResolver,
    translater: TranslateService
  ) {
    if (componentRegistry) {
      componentRegistry.registry({
        type: 'tabs',
        title: translater.instant(`dynamicComponent.tabs`),
        group: 'container',
        fac: cfr.resolveComponentFactory(TabsComponent),
        metadataProvider: async (partial: PartialComponentMetadata) => ({
          body: [
            {
              id: await idGenerator.generate('tab', partial.id),
              type: 'tab',
              title: '页签1'
            }
          ]
        })
      });

      componentRegistry.registry({
        type: 'tab',
        title: translater.instant(`dynamicComponent.tab`),
        fac: cfr.resolveComponentFactory(TabComponent)
      });
    }
  }
}
