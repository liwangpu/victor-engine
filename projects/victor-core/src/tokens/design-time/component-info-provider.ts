import { ComponentFactory, InjectionToken } from '@angular/core';
import { ComponentMetadata } from '../../models';

export interface ComponentInfoProvider {
  getComponentInfo(): Promise<{ id: string; type: string; title: string }[]>;
  getComponentMetadata(): Promise<{ [type: string]: ComponentMetadata }>;
}

export const COMPONENT_INFO_PROVIDER: InjectionToken<ComponentInfoProvider> = new InjectionToken<ComponentInfoProvider>('component info provider');