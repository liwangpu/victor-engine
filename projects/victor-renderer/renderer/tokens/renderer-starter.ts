import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicComponentMetadata } from 'victor-core';


export interface RendererStarter {
  getSchema(): Observable<DynamicComponentMetadata>;
}

export const RENDERER_STARTER = new InjectionToken<RendererStarter>('renderer starter');