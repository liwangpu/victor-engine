import { ComponentRef, Inject, Injectable, Injector, Renderer2, ViewContainerRef } from '@angular/core';
import { DynamicComponent, ComponentConfiguration, DynamicComponentRegistry, DynamicComponentRenderer, COMPONENT_CONFIGURATION, DYNAMIC_COMPONENT_REGISTRY, LazyService } from 'victor-core';

@Injectable()
export class DynamicComponentRendererService implements DynamicComponentRenderer {

  @LazyService(DYNAMIC_COMPONENT_REGISTRY)
  protected registry: DynamicComponentRegistry;
  constructor(
    protected injector: Injector
  ) { }

  async render(parent: Injector, metadata: ComponentConfiguration, container: ViewContainerRef): Promise<ComponentRef<DynamicComponent>> {
    const ij = Injector.create({
      providers: [
        { provide: COMPONENT_CONFIGURATION, useValue: metadata },
      ],
      parent
    });
    const des = await this.registry.getComponentDescription(metadata.type);
    const ref = container.createComponent(des.fac, null, ij);
    const nel: HTMLElement = ref.location.nativeElement;
    nel.classList.add('dynamic-component');
    return ref;
  }
}
