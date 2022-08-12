import { NgModule } from '@angular/core';
import { createReducer, StoreModule } from '@ngrx/store';
import { VICTOR_RENDERER_INITIAL_STATE, victorRendererStateKey } from './state';
import { ons as componentScopeOns } from './component-scope/reducer';

const _reducer = createReducer(VICTOR_RENDERER_INITIAL_STATE, ...[
  ...componentScopeOns,
])

function victorRendererReducer(state: any, action: any): any {
  return _reducer(state, action);
}


@NgModule({
  imports: [
    StoreModule.forFeature(victorRendererStateKey, victorRendererReducer)
  ]
})
export class StateStoreModule { }
