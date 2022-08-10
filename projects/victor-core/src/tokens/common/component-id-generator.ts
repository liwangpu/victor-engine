import { InjectionToken } from '@angular/core';

export interface ComponentIdGenerator {
  generate(type: string, parentId?: string): Promise<string>;
}

export const COMPONENT_ID_GENERATOR = new InjectionToken<ComponentIdGenerator>('component id generator');
