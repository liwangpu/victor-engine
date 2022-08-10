import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { CustomRenderProvider, DynamicComponent, DynamicComponentMetadata } from 'victor-core';
import { DropContainerComponent } from 'victor-editor/drop-container';

@Injectable()
export class CustomRenderProviderService implements CustomRenderProvider {

  constructor(
    protected cfr: ComponentFactoryResolver
  ) { }

  async getRenderFactory(metadata: DynamicComponentMetadata): Promise<ComponentFactory<DynamicComponent>> {
    let fac: ComponentFactory<DynamicComponent> = null;
    switch (metadata.type) {
      default:
        fac = this.cfr.resolveComponentFactory(DropContainerComponent);
        break;
    }
    return fac;
  }
}
