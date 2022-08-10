import { createSelector, MemoizedSelector } from '@ngrx/store';
import { DynamicComponentMetadata } from 'victor-core';
import { FormDesignerState, selectFormDesignerState } from '../state';

function getBodyMetadata(state: FormDesignerState, bodyIds: string[]): DynamicComponentMetadata[] {
  const body: DynamicComponentMetadata[] = [];
  if (bodyIds?.length) {
    bodyIds.forEach(cid => {
      const cmd = state.componentMetadata[cid] || {};
      const ctree = state.componentTree[cid];
      if (!ctree) { return; }
      body.push({ ...cmd, id: cid, type: ctree.type });
    });
  }
  return body;
}

// 注意,这里body只选择第一级
export const selectActiveComponentMetadata: MemoizedSelector<FormDesignerState, DynamicComponentMetadata> = createSelector(
  selectFormDesignerState,
  (state: FormDesignerState) => {
    if (!state.activeComponentId) { return null; }

    const tree = state.componentTree[state.activeComponentId];
    if (!tree) { return null; }
    const metadata = state.componentMetadata[tree.id] || {};
    const body = getBodyMetadata(state, tree.body);
    return { ...metadata, id: tree.id, type: tree.type, body };
  }
);

// 注意,这里body只选择第一级
export const selectComponentMetadata: (id: string) => MemoizedSelector<FormDesignerState, DynamicComponentMetadata> = id => createSelector(
  selectFormDesignerState,
  (state: FormDesignerState) => {
    if (!id) { return null; }

    const tree = state.componentTree[id];
    if (!tree) { return null; }
    const metadata = state.componentMetadata[tree.id] || {};
    const body = getBodyMetadata(state, tree.body);
    return { ...metadata, id: tree.id, type: tree.type, body };
  }
);