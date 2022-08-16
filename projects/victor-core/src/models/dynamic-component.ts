import { InjectionToken, Injector } from '@angular/core';
import { LazyService, PropertyEntry } from '../utils/common-decorator';
import 'reflect-metadata';
import { ComponentValidatorRule } from 'victor-core';

enum metadataType {
  scope = 'scope',
  action = 'action',
  event = 'event'
}


export interface ComponentConfiguration {
  id: string;
  type: string;
  title?: string;
  validators?: ComponentValidatorRule[];
  body?: ComponentConfiguration[];
  [key: string]: any;
}


export const COMPONENT_CONFIGURATION = new InjectionToken<DynamicComponent>('component configuration');

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

export interface ComponentMetadata {
  scopes: Array<{ key: string; type: string }>;
  actions: Array<{ key: string; type: string }>;
  events: Array<{ key: string; type: string }>;
}

export abstract class DynamicComponent {

  @PropertyEntry('configuration.id')
  id: string;
  @PropertyEntry('configuration.type')
  type: string;
  @PropertyEntry('configuration.title')
  title: string;
  @LazyService(COMPONENT_CONFIGURATION)
  configuration: ComponentConfiguration;
  @LazyService(DYNAMIC_COMPONENT_SCOPES, {})
  scopes: DynamicComponentScopes;
  protected scopeChangeFn: (scope: string, value: any) => void;
  constructor(
    public injector: Injector
  ) { }

  protected getMetadata(): ComponentMetadata {
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