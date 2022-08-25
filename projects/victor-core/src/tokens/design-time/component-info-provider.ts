import { ComponentFactory, InjectionToken } from '@angular/core';

export interface ComponentInfoProvider {
  getComponentInfo(): Promise<{ id: string; type: string; title: string }[]>;
}

export const COMPONENT_INFO_PROVIDER: InjectionToken<ComponentInfoProvider> = new InjectionToken<ComponentInfoProvider>('component info provider');