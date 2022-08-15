import { NgModule } from '@angular/core';
import { COMPONENT_ID_GENERATOR, DYNAMIC_COMPONENT_REGISTRY, DYNAMIC_COMPONENT_RENDERER } from 'victor-core';
import { DynamicComponentRegistryService } from './dynamic-component-registry.service';

@NgModule({
  providers: [
    { provide: DYNAMIC_COMPONENT_REGISTRY, useClass: DynamicComponentRegistryService },
  ]
})
export class NativeComponetMarketModule { }
