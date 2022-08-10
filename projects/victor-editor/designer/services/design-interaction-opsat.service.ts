import { Injectable } from '@angular/core';
import { DesignInteractionAction, DesignInteractionEvent, DesignInteractionOpsat } from 'victor-core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DesignInteractionOpsatService implements DesignInteractionOpsat {

  private readonly _event$ = new Subject<DesignInteractionEvent>();
  private readonly _action$ = new Subject<DesignInteractionAction>();

  get event$(): Observable<DesignInteractionEvent> {
    return this._event$.asObservable();
  }
  get action$(): Observable<DesignInteractionAction> {
    return this._action$.asObservable();
  }

  publishEvent(event: DesignInteractionEvent): void {
    this._event$.next(event);
  }

  execAction(action: DesignInteractionAction): void {
    this._action$.next(action);
  }

}
