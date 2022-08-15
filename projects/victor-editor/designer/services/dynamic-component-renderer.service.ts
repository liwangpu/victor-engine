import { ComponentRef, Inject, Injectable, Injector, Renderer2, ViewContainerRef } from '@angular/core';
import { DynamicComponent, DynamicComponentMetadata, DynamicComponentRegistry, DynamicComponentRenderer, DYNAMIC_COMPONENT_METADATA, DYNAMIC_COMPONENT_REGISTRY, LazyService } from 'victor-core';

@Injectable()
export class DynamicComponentRendererService implements DynamicComponentRenderer {

  @LazyService(DYNAMIC_COMPONENT_REGISTRY)
  protected registry: DynamicComponentRegistry;
  constructor(
    protected injector: Injector
  ) { }

  async render(parent: Injector, metadata: DynamicComponentMetadata, container: ViewContainerRef): Promise<ComponentRef<DynamicComponent>> {
    const ij = Injector.create({
      providers: [
        { provide: DYNAMIC_COMPONENT_METADATA, useValue: metadata },
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
