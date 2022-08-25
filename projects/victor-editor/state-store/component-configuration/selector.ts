import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ComponentConfiguration } from 'victor-core';
import { VictorDesignerState, selectVictorDesignerState } from '../state';

function getBodyConfiguration(state: VictorDesignerState, bodyIds: string[]): ComponentConfiguration[] {
  const body: ComponentConfiguration[] = [];
  if (bodyIds?.length) {
    bodyIds.forEach(cid => {
      const cmd = state.componentConfigurations[cid] || {};
      const ctree = state.componentTrees[cid];
      if (!ctree) { return; }
      body.push({ ...cmd, id: cid, type: ctree.type });
    });
  }
  return body;
}

// 注意,这里body只选择第一级
export const selectActiveComponentMetadata: MemoizedSelector<VictorDesignerState, ComponentConfiguration> = createSelector(
  selectVictorDesignerState,
  (state: VictorDesignerState) => {
    if (!state.activeComponentId) { return null; }

    const tree = state.componentTrees[state.activeComponentId];
    if (!tree) { return null; }
    const metadata = state.componentConfigurations[tree.id] || {};
    const body = getBodyConfiguration(state, tree.body);
    return { ...metadata, id: tree.id, type: tree.type, body };
  }
);

// 注意,这里body只选择第一级
export const selectComponentConfiguration: (id: string) => MemoizedSelector<VictorDesignerState, ComponentConfiguration> = id => createSelector(
  selectVictorDesignerState,
  (state: VictorDesignerState) => {
    if (!id) { return null; }

    const tree = state.componentTrees[id];
    if (!tree) { return null; }
    const metadata = state.componentConfigurations[tree.id] || {};
    const body = getBodyConfiguration(state, tree.body);
    return { ...metadata, id: tree.id, type: tree.type, body };
  }
);

export const selectComponentBasicInfos: MemoizedSelector<VictorDesignerState, { id: string; type: string; title: string }[]> = createSelector(
  selectVictorDesignerState,
  (state: VictorDesignerState) => {
    const ids = Object.keys(state.componentConfigurations);
    return ids.map(id => {
      const c = state.componentConfigurations[id];

      return { id: c.id, type: c.type, title: c.title };
    });
  }
);