import { ComponentRef, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { DynamicComponent, ComponentConfiguration, DynamicComponentRenderer, COMPONENT_CONFIGURATION, LazyService, ComponentDiscoveryService, InitialConfigurationProvider, IHasInitialConfiguration, COMPONENT_ID_GENERATOR, ComponentIdGenerator } from 'victor-core';
import { ComponentDesignWrapperComponent } from 'victor-editor/drop-container';
import { setComponentMetadata } from 'victor-editor/state-store';
import * as _ from 'lodash';

@Injectable()
export class DynamicComponentRendererService implements DynamicComponentRenderer {

  @LazyService(ComponentDiscoveryService)
  protected readonly componentDiscovery: ComponentDiscoveryService;
  @LazyService(COMPONENT_ID_GENERATOR)
  protected idGenerator: ComponentIdGenerator;
  @LazyService(Store)
  private readonly store: Store;
  constructor(
    protected injector: Injector
  ) { }

  async render(parent: Injector, config: ComponentConfiguration, container: ViewContainerRef): Promise<ComponentRef<DynamicComponent>> {
    const moduleRef = await this.componentDiscovery.loadComponentRunTimeModuleRef(config.type);
    if (!moduleRef) { return null; }
    const hasBeenwrapped = container['_hostLView'][0].nodeName === 'VICTOR-DESIGNER-COMPONENT-DESIGN-WRAPPER';
    let componentRef: ComponentRef<any>;
    const ij = Injector.create({
      providers: [
        { provide: COMPONENT_CONFIGURATION, useValue: config },
      ],
      parent
    });
    if (hasBeenwrapped) {
      const componentType = moduleRef.instance.getComponentType(config.type);
      // const implementInitalConfigurationProvider = typeof (componentType as any).configurationProvider === 'function';
      // if (implementInitalConfigurationProvider) {
      //   const context = { injector: parent, idGenerator: this.idGenerator };
      //   const partialConfig = await (componentType as any).configurationProvider(_.cloneDeep(config), context);
      //   if (partialConfig) {
      //     config = { ...config, ...partialConfig };
      //   }
      // }
      componentRef = container.createComponent(componentType, {
        injector: ij,
        ngModuleRef: moduleRef
      });
    } else {
      componentRef = container.createComponent(ComponentDesignWrapperComponent, {
        injector: ij
      });
    }
    // 设计器模式下,手动包一层design wrapper

    if (hasBeenwrapped) {
      const metadata = componentRef.instance['getMetadata']();
      this.store.dispatch(setComponentMetadata({ componentType: config.type, metadata, source: DynamicComponentRendererService.name }));
    }
    const nel: HTMLElement = componentRef.location.nativeElement;
    nel.classList.add('dynamic-component');
    return componentRef;
  }
}
