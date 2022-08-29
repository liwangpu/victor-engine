import { Injector } from '@angular/core';
import { ComponentIdGenerator } from '../tokens/common/component-id-generator';
import { DynamicComponent, PartialComponentConfiguration } from './dynamic-component';

export interface IHasInitialConfiguration {
  new(...args: any[]): DynamicComponent;
  configurationProvider(partial: PartialComponentConfiguration, context: { injector: Injector, idGenerator: ComponentIdGenerator }): Promise<PartialComponentConfiguration>;
}

export type InitialConfigurationProvider<I extends new (...args: any[]) => any, C extends I> = InstanceType<I>;