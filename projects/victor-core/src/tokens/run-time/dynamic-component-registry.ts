import { ComponentFactory, InjectionToken, Injector } from '@angular/core';
import { LazyService, PropertyEntry } from '../../utils/common-decorator';
import 'reflect-metadata';

enum metadataType {
  action = 'action',
  event = 'event'
}

export type PartialComponentMetadata = { [P in keyof DynamicComponentMetadata]?: DynamicComponentMetadata[P] };

export interface DynamicComponentMetadata {
  id: string;
  type: string;
  title?: string;
  configuration?: { [key: string]: any };
  body?: DynamicComponentMetadata[];
}


export const DYNAMIC_COMPONENT_METADATA = new InjectionToken<DynamicComponent>('dynamic component metadata');

export function ComponentEvent(): Function {
  return function (target: object, propertyName: string, propertyDesciptor: PropertyDescriptor): any {
    Reflect.defineMetadata(propertyName, { metadataType: metadataType.event }, target);
    return propertyDesciptor;
  }
}

export function ComponentAction(): Function {
  return function (target: object, propertyName: string, propertyDesciptor: PropertyDescriptor): any {
    Reflect.defineMetadata(propertyName, { metadataType: metadataType.action }, target);
    return propertyDesciptor;
  }
}

export interface ComponentMetadataDescription {
  actions: Array<{ key: string; type: string }>;
  events: Array<{ key: string; type: string }>;
}

export abstract class DynamicComponent {
  @PropertyEntry('metadata.id')
  id: string;
  @PropertyEntry('metadata.type')
  type: string;
  @LazyService(DYNAMIC_COMPONENT_METADATA)
  metadata: DynamicComponentMetadata;
  constructor(
    public injector: Injector
  ) { }

  private getMetaDataDescription(): ComponentMetadataDescription {
    const keys: Array<any> = Reflect.getMetadataKeys(this);
    const actions: Array<{ key: string; type: string }> = [];
    const events: Array<{ key: string; type: string }> = [];
    keys.forEach(key => {

      let md: { metadataType: metadataType, [key: string]: any } = Reflect.getMetadata(key, this);
      switch (md.metadataType) {
        case metadataType.action:
          actions.push({ key, type: this.type });
          break;
        case metadataType.event:
          events.push({ key, type: this.type });
          break;
        default:
          break;

      }
    });

    return { actions, events };
  }

}

export const DYNAMIC_COMPONENT = new InjectionToken<DynamicComponent>('dynamic component');

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