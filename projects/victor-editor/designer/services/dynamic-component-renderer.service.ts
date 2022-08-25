import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, Renderer2, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { DynamicComponent, ComponentConfiguration, DynamicComponentRegistry, DynamicComponentRenderer, COMPONENT_CONFIGURATION, DYNAMIC_COMPONENT_REGISTRY, LazyService } from 'victor-core';
import { ComponentDesignWrapperComponent } from 'victor-editor/drop-container';
import { setComponentMetadata } from 'victor-editor/state-store';

@Injectable()
export class DynamicComponentRendererService implements DynamicComponentRenderer {

  @LazyService(DYNAMIC_COMPONENT_REGISTRY)
  protected readonly registry: DynamicComponentRegistry;
  @LazyService(ComponentFactoryResolver)
  protected readonly cfr: ComponentFactoryResolver;
  @LazyService(Store)
  private readonly store: Store;
  constructor(
    protected injector: Injector
  ) { }

  async render(parent: Injector, config: ComponentConfiguration, container: ViewContainerRef): Promise<ComponentRef<DynamicComponent>> {
    const ij = Injector.create({
      providers: [
        { provide: COMPONENT_CONFIGURATION, useValue: config },
      ],
      parent
    });

    const hasBeenwrapped = container['_hostLView'][0].nodeName === 'VICTOR-DESIGNER-COMPONENT-DESIGN-WRAPPER';
    let fac: ComponentFactory<DynamicComponent>;
    if (hasBeenwrapped) {
      const des = await this.registry.getComponentDescription(config.type);
      fac = des.fac;
    } else {
      fac = this.cfr.resolveComponentFactory(ComponentDesignWrapperComponent);
    }
    // 设计器模式下,手动包一层design wrapper
    const ref = container.createComponent(fac, null, ij);
    if(hasBeenwrapped){
      const metadata = ref.instance['getMetadata']();
      this.store.dispatch(setComponentMetadata({ componentType: config.type, metadata, source: DynamicComponentRendererService.name }));
    }
    const nel: HTMLElement = ref.location.nativeElement;
    nel.classList.add('dynamic-component');
    return ref;
  }
}
