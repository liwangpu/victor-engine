import { Type } from '@angular/core';
import { ComponentDesignPanel } from './component-design-panel';

export interface ComponentDesignTimeModule {
  getComponentType(type: string): Type<ComponentDesignPanel>;
}
