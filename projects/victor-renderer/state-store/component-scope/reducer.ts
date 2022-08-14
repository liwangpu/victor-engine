import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { VictorRendererState } from '../state';
import * as fromAction from './action';
import { ComponentScope } from './state';

export const ons: ReducerTypes<VictorRendererState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.setComponentScope, (state: VictorRendererState, { id, title, scopeName, scopeValue, scopeSource }) => {
    const componentScopes = { ...state.componentScopes };
    const comScope: ComponentScope = { id, title, scopes: componentScopes[id]?.scopes ? { ...componentScopes[id].scopes } : {} };
    comScope.scopes[scopeName] = { value: scopeValue, source: scopeSource };
    componentScopes[id] = comScope;
    return { ...state, componentScopes };
  })
];