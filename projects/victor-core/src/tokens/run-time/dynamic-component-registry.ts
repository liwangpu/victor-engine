import { ComponentFactory, InjectionToken } from '@angular/core';
import 'reflect-metadata';
import { DynamicComponent, ComponentConfiguration } from '../../models';

export type PartialComponentMetadata = { [P in keyof ComponentConfiguration]?: ComponentConfiguration[P] };

export interface ComponentDescription {
  type: string;
  title: string;
  fac: ComponentFactory<DynamicComponent>;
  group?: string;
  icon?: string;
  metadataProvider?: (partial: PartialComponentMetadata) => Promise<PartialComponentMetadata>;
}

export interface DynamicComponentRegistry {
  registry(des: ComponentDescription): void;
  getComponentDescription(type: string): Promise<ComponentDescription>;
  getComponentDescriptions(): Promise<Array<ComponentDescription>>;
}

export const DYNAMIC_COMPONENT_REGISTRY: InjectionToken<DynamicComponentRegistry> = new InjectionToken<DynamicComponentRegistry>('dynamic component registry');