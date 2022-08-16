import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentConfiguration } from 'victor-core';


export interface RendererStarter {
  getSchema(): Observable<ComponentConfiguration>;
}

export const RENDERER_STARTER = new InjectionToken<RendererStarter>('renderer starter');