import { ComponentRef, InjectionToken, Injector, ViewContainerRef } from '@angular/core';
import { DynamicComponent, DynamicComponentMetadata } from './dynamic-component-registry';

export interface DynamicComponentRenderer {
  render(parent: Injector, metadata: DynamicComponentMetadata, container: ViewContainerRef): Promise<ComponentRef<DynamicComponent>>;
}

export const DYNAMIC_COMPONENT_RENDERER: InjectionToken<DynamicComponentRenderer> = new InjectionToken<DynamicComponentRenderer>('dynamic component renderer');