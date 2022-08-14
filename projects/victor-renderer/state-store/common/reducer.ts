import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { VictorRendererState } from '../state';
import * as fromAction from './action';

export const ons: ReducerTypes<VictorRendererState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.setComponentMetadata, (state: VictorRendererState, { id, metadata, description }) => {
    const componentDescriptions = { ...state.componentDescriptions };
    const componentMetadatas = { ...state.componentMetadatas };
    componentDescriptions[id] = description;
    componentMetadatas[id] = metadata;
    return { ...state, componentDescriptions, componentMetadatas };
  })
];