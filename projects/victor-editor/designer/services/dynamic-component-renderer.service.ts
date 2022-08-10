import { ComponentRef, Inject, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { DynamicComponent, DynamicComponentMetadata, DynamicComponentRegistry, DynamicComponentRenderer, DYNAMIC_COMPONENT_METADATA, DYNAMIC_COMPONENT_REGISTRY } from 'victor-core';

@Injectable()
export class DynamicComponentRendererService implements DynamicComponentRenderer {

  constructor(
    @Inject(DYNAMIC_COMPONENT_REGISTRY)
    private registry: DynamicComponentRegistry
  ) { }
  async render(parent: Injector, metadata: DynamicComponentMetadata, container: ViewContainerRef): Promise<ComponentRef<DynamicComponent>> {
    // console.log('metadata:',metadata);
    const ij = Injector.create({
      providers: [
        { provide: DYNAMIC_COMPONENT_METADATA, useValue: metadata },
      ],
      parent
    });
    const des = await this.registry.getComponentDescription(metadata.type);
    return container.createComponent(des.fac, null, ij);
  }
}
