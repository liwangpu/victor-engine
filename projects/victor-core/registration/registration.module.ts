import { NgModule } from '@angular/core';
import { DYNAMIC_COMPONENT_REGISTRY, DYNAMIC_COMPONENT_RENDERER } from 'victor-core';
import { DynamicComponentRegistryService } from './dynamic-component-registry.service';
import { DynamicComponentRendererService } from './dynamic-component-renderer.service';

@NgModule({
  providers: [
    { provide: DYNAMIC_COMPONENT_REGISTRY, useClass: DynamicComponentRegistryService },
    { provide: DYNAMIC_COMPONENT_RENDERER, useClass: DynamicComponentRendererService },
  ]
})
export class RegistrationModule { }
