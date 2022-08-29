import { InjectionToken, Type } from '@angular/core';
import { DynamicComponent, ComponentConfiguration } from '../../models';

export interface CustomRenderProvider {
  getRenderComponent(config: ComponentConfiguration): Promise<Type<DynamicComponent>>;
}
export const CUSTOM_RENDER_PROVIDER: InjectionToken<CustomRenderProvider> = new InjectionToken<CustomRenderProvider>('custom render provider');