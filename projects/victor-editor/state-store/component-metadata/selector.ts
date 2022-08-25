import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ComponentMetadata } from 'victor-core';
import { VictorDesignerState, selectVictorDesignerState } from '../state';

export const selectComponentMetadatas: MemoizedSelector<VictorDesignerState, { [type: string]: ComponentMetadata }> = createSelector(
  selectVictorDesignerState,
  (state: VictorDesignerState) => state.componentMetadatas
);