import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { victorDesignerStateKey, VICTOR_DESIGNER_INITIAL_STATE } from './state';
import { createReducer } from '@ngrx/store';
import { ons as commonOns } from './common/reducer';
import { ons as visualEditingOns } from './visual-editing/reducer';
import { ons as componentConfigurationOns } from './component-configuration/reducer';
import { ons as componentMetadataOns } from './component-metadata/reducer';

const _reducer = createReducer(VICTOR_DESIGNER_INITIAL_STATE, ...[
  ...commonOns,
  ...visualEditingOns,
  ...componentConfigurationOns,
  ...componentMetadataOns
])

function victorDesignerReducer(state: any, action: any): any {
  return _reducer(state, action);
}


@NgModule({
  imports: [
    StoreModule.forFeature(victorDesignerStateKey, victorDesignerReducer)
  ]
})
export class StateStoreModule { }
