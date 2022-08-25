import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { VictorDesignerState } from '../state';
import * as fromAction from './action';

export const ons: ReducerTypes<VictorDesignerState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.setComponentMetadata, (state: VictorDesignerState, { componentType, metadata }) => {
    if (state.componentMetadatas[componentType]) {
      return state;
    }
    const componentMetadatas = { ...state.componentMetadatas };
    componentMetadatas[componentType] = metadata;
    return { ...state, componentMetadatas };
  })
];