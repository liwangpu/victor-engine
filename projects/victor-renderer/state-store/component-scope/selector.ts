import { createSelector, MemoizedSelector } from '@ngrx/store';
import { VictorRendererState, selectVictorRendererState } from '../state';
import { ComponentScope, ComponentScopeValue } from './state';

export const selectComonentScopes: (id: string) => MemoizedSelector<VictorRendererState, { [scopeName: string]: ComponentScopeValue }> = id => createSelector(
  selectVictorRendererState,
  (state: VictorRendererState) => {
    if (!id) { return null; }
    const setting: ComponentScope = state.componentScopes[id];
    return setting?.scopes || null;
  }
);
