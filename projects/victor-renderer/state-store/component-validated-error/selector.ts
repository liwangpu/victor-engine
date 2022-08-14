import { createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { VictorRendererState, selectVictorRendererState } from '../state';

export const selectComonentValidatedErrors: (id: string) => MemoizedSelector<VictorRendererState, { [scopeName: string]: string }> = id => createSelector(
  selectVictorRendererState,
  (state: VictorRendererState) => {
    if (!id) { return null; }
    const errors = state.componentValidatedErrors[id];
    return errors || null;
  }
);
