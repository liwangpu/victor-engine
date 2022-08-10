import { ComponentFactory, InjectionToken } from '@angular/core';
import { DynamicComponent, DynamicComponentMetadata } from '../run-time/dynamic-component-registry';

export interface CustomRenderProvider {
  getRenderFactory(metadata: DynamicComponentMetadata): Promise<ComponentFactory<DynamicComponent>>;
}
export const CUSTOM_RENDER_PROVIDER: InjectionToken<CustomRenderProvider> = new InjectionToken<CustomRenderProvider>('custom render provider');