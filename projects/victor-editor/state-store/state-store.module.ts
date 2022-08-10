import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { formDesignerStateKey, FORM_DESIGNER_INITIAL_STATE } from './state';
import { createReducer } from '@ngrx/store';
import { ons as commonOns } from './common/reducer';
import { ons as visualEditingOns } from './visual-editing/reducer';
import { ons as componentConfigurationOns } from './component-metadata/reducer';

const _reducer = createReducer(FORM_DESIGNER_INITIAL_STATE, ...[
  ...commonOns,
  ...visualEditingOns,
  ...componentConfigurationOns
])

function formDesignerReducer(state: any, action: any): any {
  return _reducer(state, action);
}


@NgModule({
  imports: [
    StoreModule.forFeature(formDesignerStateKey, formDesignerReducer)
  ]
})
export class StateStoreModule { }
