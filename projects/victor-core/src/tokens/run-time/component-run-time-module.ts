import { Type } from '@angular/core';
import { DynamicComponent } from '../../models';

export interface ComponentRunTimeModule {
  getComponentType(type: string): Type<DynamicComponent>;
}
