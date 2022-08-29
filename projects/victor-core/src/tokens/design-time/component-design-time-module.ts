import { Type } from '@angular/core';

export interface ComponentDesignTimeModule {
  getComponentType(type: string): Type<any>;
}
