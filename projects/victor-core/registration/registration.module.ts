import { NgModule } from '@angular/core';
import { COMPONENT_ID_GENERATOR, DYNAMIC_COMPONENT_REGISTRY, DYNAMIC_COMPONENT_RENDERER } from 'victor-core';
import { ComponentIdGeneratorService } from './component-id-generator.service';
import { DynamicComponentRegistryService } from './dynamic-component-registry.service';
import { DynamicComponentRendererService } from './dynamic-component-renderer.service';

@NgModule({
  providers: [
    { provide: COMPONENT_ID_GENERATOR, useClass: ComponentIdGeneratorService },
    { provide: DYNAMIC_COMPONENT_REGISTRY, useClass: DynamicComponentRegistryService },
    { provide: DYNAMIC_COMPONENT_RENDERER, useClass: DynamicComponentRendererService },
  ]
})
export class RegistrationModule { }
