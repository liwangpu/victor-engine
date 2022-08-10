import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface DesignInteractionEvent {
  componentId: string;
  eventName: string;
  data?: any;
}

export interface DesignInteractionAction {
  componentId: string;
  actionName: string;
  data?: any;
}


export interface DesignInteractionOpsat {
  event$: Observable<DesignInteractionEvent>;
  action$: Observable<DesignInteractionAction>;
  publishEvent(event: DesignInteractionEvent): void;
  execAction(action: DesignInteractionAction): void;
}

export const DESIGN_INTERACTION_OPSAT = new InjectionToken<DesignInteractionOpsat>('design interaction opsat');

export const INTERACTION_ACTION_EXECUTOR = new InjectionToken<(eventName: string, data?: any) => void>('design interaction action executor');
export const INTERACTION_EVENT_OBSERVER = new InjectionToken<Observable<{ eventName: string, data?: any }>>('design interaction event observer');