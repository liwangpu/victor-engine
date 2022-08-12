import { createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { VictorDesignerState, selectVictorDesignerState } from '../state';
import { ComponentTreeState } from './state';

export const selectFirstLevelBodyComponents: (id: string) => MemoizedSelector<VictorDesignerState, { id: string; title?: string; type: string }[]> = id => createSelector(
  selectVictorDesignerState,
  (state: VictorDesignerState) => {
    if (!id) { return []; }
    const tree = state.componentTree[id];
    if (!tree?.body?.length) { return []; }
    const bodys = [];
    tree.body.forEach(cid => {
      const md = state.componentMetadata[cid];
      bodys.push({ id: cid, type: state.componentTree[cid].type, title: md?.title });
    });
    return bodys;
  }
);

export const selectActiveComponentId: MemoizedSelector<VictorDesignerState, string> = createSelector(
  selectVictorDesignerState,
  (state: VictorDesignerState) => state.activeComponentId
);

export const selectAllComponentIds: MemoizedSelector<VictorDesignerState, string[]> = createSelector(
  selectVictorDesignerState,
  (state: VictorDesignerState) => Object.keys(state.componentTree)
);

export const selectFirstLevelBodyComponentIds: (id: string) => MemoizedSelector<VictorDesignerState, string[]> = id => createSelector(
  selectVictorDesignerState,
  (state: VictorDesignerState) => {
    if (!id) { return []; }
    const tree = state.componentTree[id];
    return tree.body || [];
  }
);

export const selectPageTree: MemoizedSelector<VictorDesignerState, ComponentTreeState> = createSelector(
  selectVictorDesignerState,
  (state: VictorDesignerState) => {
    if (!state.componentTree) { return null; }
    const componentIds = Object.keys(state.componentTree);
    const componentTrees: ComponentTreeState[] = componentIds.map(id => state.componentTree[id]);
    let pageTree = componentTrees.find(t => t.type === 'page');
    return pageTree;
  }
);