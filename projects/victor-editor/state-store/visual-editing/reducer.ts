import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { VictorDesignerState } from '../state';
import * as fromAction from './action';
import { ComponentTreeState } from './state';

export const ons: ReducerTypes<VictorDesignerState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.addNewComponent, (state: VictorDesignerState, { metadata, parentId, index }) => {
    const componentTrees = { ...state.componentTrees };
    if (componentTrees[metadata.id]) { return state; }
    const componentMetadatas = { ...state.componentMetadatas };
    const tree: ComponentTreeState = { id: metadata.id, type: metadata.type, parentId };
    // 
    componentTrees[metadata.id] = tree;
    const parentTree = { ...componentTrees[parentId] };
    parentTree.body = parentTree.body?.length ? [...parentTree.body] : [];
    // parentTree.body.push(metadata.id);
    parentTree.body.splice(index, 0, metadata.id);
    componentTrees[parentId] = parentTree;
    componentMetadatas[metadata.id] = { ...metadata, body: [] };
    // 容器组件的body需要维护到tree上
    if (metadata.body?.length) {
      for (let cmd of metadata.body) {
        if (!componentTrees[cmd.id]) {
          const ctree: ComponentTreeState = { id: cmd.id, type: cmd.type, parentId: metadata.id };
          componentTrees[ctree.id] = ctree;
          componentMetadatas[cmd.id] = cmd;
        }
      }
      tree.body = metadata.body.map(c => c.id);
    }
    return { ...state, componentTrees, componentMetadatas, activeComponentId: state.activeComponentId || metadata.id };
  }),
  on(fromAction.activeComponent, (state: VictorDesignerState, { id }) => {
    if (state.activeComponentId === id) { return state; }
    return { ...state, activeComponentId: id };
  }),
  on(fromAction.moveComponent, (state: VictorDesignerState, { id, parentId, index }) => {
    const componentTrees = { ...state.componentTrees };
    const tree = { ...state.componentTrees[id] };
    const originParent = { ...state.componentTrees[tree.parentId] };
    originParent.body = originParent.body?.length ? [...originParent.body] : [];
    const oldIndex = originParent.body.findIndex(oid => oid === id);
    originParent.body.splice(oldIndex, 1);
    componentTrees[originParent.id] = originParent;
    const parentTree = { ...componentTrees[parentId] };
    parentTree.body = parentTree.body?.length ? [...parentTree.body] : [];
    parentTree.body.splice(index, 0, id);
    componentTrees[parentTree.id] = parentTree;
    tree.parentId = parentId;
    componentTrees[tree.id] = tree;
    return { ...state, componentTrees };
  })
];