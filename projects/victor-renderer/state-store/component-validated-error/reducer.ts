import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { VictorRendererState } from '../state';
import * as fromAction from './action';

export const ons: ReducerTypes<VictorRendererState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.setComponentValidatedError, (state: VictorRendererState, { id, errors }) => {
    const componentValidatedErrors = { ...state.componentValidatedErrors };
    if (errors && Object.keys(errors).length) {
      componentValidatedErrors[id] = errors;
    } else {
      delete componentValidatedErrors[id];
    }

    return { ...state, componentValidatedErrors };
  })
];