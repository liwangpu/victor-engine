import { createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { FormDesignerState, selectFormDesignerState } from '../state';
import { ComponentTreeState } from './state';

export const selectFirstLevelBodyComponents: (id: string) => MemoizedSelector<FormDesignerState, { id: string; title?: string; type: string }[]> = id => createSelector(
  selectFormDesignerState,
  (state: FormDesignerState) => {
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

export const selectActiveComponentId: MemoizedSelector<FormDesignerState, string> = createSelector(
  selectFormDesignerState,
  (state: FormDesignerState) => state.activeComponentId
);

export const selectAllComponentIds: MemoizedSelector<FormDesignerState, string[]> = createSelector(
  selectFormDesignerState,
  (state: FormDesignerState) => Object.keys(state.componentTree)
);

export const selectFirstLevelBodyComponentIds: (id: string) => MemoizedSelector<FormDesignerState, string[]> = id => createSelector(
  selectFormDesignerState,
  (state: FormDesignerState) => {
    if (!id) { return []; }
    const tree = state.componentTree[id];
    return tree.body || [];
  }
);

export const selectPageTree: MemoizedSelector<FormDesignerState, ComponentTreeState> = createSelector(
  selectFormDesignerState,
  (state: FormDesignerState) => {
    if (!state.componentTree) { return null; }
    const componentIds = Object.keys(state.componentTree);
    const componentTrees: ComponentTreeState[] = componentIds.map(id => state.componentTree[id]);
    let pageTree = componentTrees.find(t => t.type === 'page');
    return pageTree;
  }
);