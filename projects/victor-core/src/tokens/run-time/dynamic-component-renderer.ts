import { ComponentRef, InjectionToken, Injector, ViewContainerRef } from '@angular/core';
import { DynamicComponent, DynamicComponentMetadata } from '../../models';

export const DYNAMIC_PAGE_ID = new InjectionToken<string>('page id');


export interface DynamicComponentRenderer {
  render(parent: Injector, metadata: DynamicComponentMetadata, container: ViewContainerRef): Promise<ComponentRef<DynamicComponent>>;
}

export const DYNAMIC_COMPONENT_RENDERER = new InjectionToken<DynamicComponentRenderer>('dynamic component renderer');