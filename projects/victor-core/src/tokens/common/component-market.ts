import { InjectionToken } from '@angular/core';
import { ComponentConfiguration } from '../../models';
import { ComponentDesignTimeModule } from '../design-time/component-design-time-module';
import { ComponentRunTimeModule } from '../run-time/component-run-time-module';

export interface ComponentDescription {
  type: string;
  title: string;
  group?: string;
  icon?: string;
  market?: string;
}

export interface ComponentMarket {
  name: string;
  getComponentDescriptions(): Promise<ComponentDescription[]>;
  getComponentDescription(type: string): Promise<ComponentDescription>;
  loadComponentRunTimeModule(type: string): Promise<ComponentRunTimeModule>;
  loadComponentDesignTimeModule(type: string): Promise<ComponentDesignTimeModule>;
}

export const COMPONENT_MARKET = new InjectionToken<ComponentMarket>('dynamic component market');