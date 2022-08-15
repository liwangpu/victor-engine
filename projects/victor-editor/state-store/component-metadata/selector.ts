import { createSelector, MemoizedSelector } from '@ngrx/store';
import { DynamicComponentMetadata } from 'victor-core';
import { VictorDesignerState, selectVictorDesignerState } from '../state';

function getBodyMetadata(state: VictorDesignerState, bodyIds: string[]): DynamicComponentMetadata[] {
  const body: DynamicComponentMetadata[] = [];
  if (bodyIds?.length) {
    bodyIds.forEach(cid => {
      const cmd = state.componentMetadatas[cid] || {};
      const ctree = state.componentTrees[cid];
      if (!ctree) { return; }
      body.push({ ...cmd, id: cid, type: ctree.type });
    });
  }
  return body;
}

// 注意,这里body只选择第一级
export const selectActiveComponentMetadata: MemoizedSelector<VictorDesignerState, DynamicComponentMetadata> = createSelector(
  selectVictorDesignerState,
  (state: VictorDesignerState) => {
    if (!state.activeComponentId) { return null; }

    const tree = state.componentTrees[state.activeComponentId];
    if (!tree) { return null; }
    const metadata = state.componentMetadatas[tree.id] || {};
    const body = getBodyMetadata(state, tree.body);
    return { ...metadata, id: tree.id, type: tree.type, body };
  }
);

// 注意,这里body只选择第一级
export const selectComponentMetadata: (id: string) => MemoizedSelector<VictorDesignerState, DynamicComponentMetadata> = id => createSelector(
  selectVictorDesignerState,
  (state: VictorDesignerState) => {
    if (!id) { return null; }

    const tree = state.componentTrees[id];
    if (!tree) { return null; }
    const metadata = state.componentMetadatas[tree.id] || {};
    const body = getBodyMetadata(state, tree.body);
    return { ...metadata, id: tree.id, type: tree.type, body };
  }
);