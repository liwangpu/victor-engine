import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { CustomRenderProvider, DynamicComponent, ComponentConfiguration } from 'victor-core';
import { DropContainerComponent } from 'victor-editor/drop-container';

@Injectable()
export class CustomRenderProviderService implements CustomRenderProvider {

  constructor(
    protected cfr: ComponentFactoryResolver
  ) { }

  async getRenderFactory(metadata: ComponentConfiguration): Promise<ComponentFactory<DynamicComponent>> {
    let fac: ComponentFactory<DynamicComponent> = null;
    switch (metadata.type) {
      default:
        fac = this.cfr.resolveComponentFactory(DropContainerComponent);
        break;
    }
    return fac;
  }
}
