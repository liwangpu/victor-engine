import { Injectable, Type } from '@angular/core';
import { CustomRenderProvider, DynamicComponent, ComponentConfiguration } from 'victor-core';
import { DropContainerComponent } from 'victor-editor/drop-container';

@Injectable()
export class CustomRenderProviderService implements CustomRenderProvider {

  async getRenderComponent(metadata: ComponentConfiguration): Promise<Type<DynamicComponent>> {
    return DropContainerComponent;
  }
}
