import { ComponentFactory, InjectionToken, Injector } from '@angular/core';
import { LazyService, PropertyEntry } from '../utils/common-decorator';
import 'reflect-metadata';
import { ComponentValidatorRule } from 'victor-core';

enum metadataType {
  scope = 'scope',
  action = 'action',
  event = 'event'
}


export interface DynamicComponentMetadata {
  id: string;
  type: string;
  title?: string;
  configuration?: { [key: string]: any };
  validators?: ComponentValidatorRule[];
  body?: DynamicComponentMetadata[];
}


export const DYNAMIC_COMPONENT_METADATA = new InjectionToken<DynamicComponent>('dynamic component metadata');

export interface DynamicComponentScopes {
  [scopeName: string]: { value: any, source?: any };
}

export const DYNAMIC_COMPONENT_SCOPES = new InjectionToken<DynamicComponent>('dynamic component scopes');

export function ComponentScope(scope?: string): Function {
  return function (target: object, propertyName: string, propertyDesciptor: PropertyDescriptor): any {
    scope = scope || 'data';
    const method: any = propertyDesciptor.value;
    Reflect.defineMetadata(scope, { metadataType: metadataType.scope }, target);
    propertyDesciptor.value = function (...args: Array<any>): Promise<any> {
      const result: any = method.apply(this, args);
      if (typeof this['scopeChangeFn'] === 'function') {
        this['scopeChangeFn'](scope, result);
      }
      return result;
    };
    return propertyDesciptor;
  }
}

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
  scopes: Array<{ key: string; type: string }>;
  actions: Array<{ key: string; type: string }>;
  events: Array<{ key: string; type: string }>;
}

export abstract class DynamicComponent {

  @PropertyEntry('metadata.id')
  id: string;
  @PropertyEntry('metadata.type')
  type: string;
  @PropertyEntry('metadata.title')
  title: string;
  @LazyService(DYNAMIC_COMPONENT_METADATA)
  metadata: DynamicComponentMetadata;
  @LazyService(DYNAMIC_COMPONENT_SCOPES, {})
  scopes: DynamicComponentScopes;
  protected scopeChangeFn: (scope: string, value: any) => void;
  constructor(
    public injector: Injector
  ) { }

  protected getMetaDataDescription(): ComponentMetadataDescription {
    const keys: Array<any> = Reflect.getMetadataKeys(this);
    const scopes: Array<{ key: string; type: string }> = [];
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
        case metadataType.scope:
          scopes.push({ key, type: this.type });
          break;
        default:
          break;

      }
    });

    return { scopes, actions, events };
  }

  protected registryScopeChangeFn(fn: (scope: string, value: any) => void): void {
    this.scopeChangeFn = fn;
  }

}

export const DYNAMIC_COMPONENT = new InjectionToken<DynamicComponent>('dynamic component');