import { ComponentFactory, InjectionToken } from '@angular/core';
import { DynamicComponent, ComponentConfiguration } from '../../models';

export interface CustomRenderProvider {
  getRenderFactory(metadata: ComponentConfiguration): Promise<ComponentFactory<DynamicComponent>>;
}
export const CUSTOM_RENDER_PROVIDER: InjectionToken<CustomRenderProvider> = new InjectionToken<CustomRenderProvider>('custom render provider');