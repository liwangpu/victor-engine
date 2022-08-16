import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { VictorRendererState } from '../state';
import * as fromAction from './action';

export const ons: ReducerTypes<VictorRendererState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.setComponentMetadata, (state: VictorRendererState, { id, metadata, configuration }) => {
    const componentMetadatas = { ...state.componentMetadatas };
    const componentConfigurations = { ...state.componentConfigurations };
    componentMetadatas[id] = metadata;
    componentConfigurations[id] = configuration;
    return { ...state, componentMetadatas, componentConfigurations };
  })
];