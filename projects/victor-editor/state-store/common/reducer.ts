import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { FormDesignerState } from '../state';
import * as fromAction from './action';

export const ons: ReducerTypes<FormDesignerState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.setDesignerState, (state: FormDesignerState, { state: newDate }) => {
    return { ...state, ...newDate };
  })
];