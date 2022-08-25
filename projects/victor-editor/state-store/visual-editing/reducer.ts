import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { ComponentConfiguration } from 'victor-core';
import { VictorDesignerState } from '../state';
import * as fromAction from './action';
import { ComponentTreeState } from './state';

export const ons: ReducerTypes<VictorDesignerState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.addNewComponent, (state: VictorDesignerState, { configuration, parentId, index }) => {
    const componentTrees = { ...state.componentTrees };
    if (componentTrees[configuration.id]) { return state; }
    const componentConfigurations = { ...state.componentConfigurations };
    const tree: ComponentTreeState = { id: configuration.id, type: configuration.type, parentId };
    componentTrees[configuration.id] = tree;
    const parentTree = { ...componentTrees[parentId] };
    parentTree.body = parentTree.body?.length ? [...parentTree.body] : [];
    parentTree.body.splice(index, 0, configuration.id);
    componentTrees[parentId] = parentTree;
    componentConfigurations[configuration.id] = { ...configuration, body: [] };
    // // 容器组件的body需要维护到tree上
    const maintainBodyComponent = (bodyCfg: ComponentConfiguration, parentId: string) => {
      if (!componentTrees[bodyCfg.id]) {
        const ctree: ComponentTreeState = { id: bodyCfg.id, type: bodyCfg.type, parentId };
        const parentTree = { ...componentTrees[parentId], body: componentTrees[parentId].body?.length ? [...componentTrees[parentId].body] : [] };
        componentTrees[bodyCfg.id] = ctree;
        parentTree.body.push(bodyCfg.id);
        componentTrees[parentId] = parentTree;
        if (bodyCfg.body?.length) {
          for (let cmd of bodyCfg.body) {
            maintainBodyComponent(cmd, bodyCfg.id);
          }
        }
        componentConfigurations[bodyCfg.id] = { ...bodyCfg, body: [] };
      }
    };
    // 容器组件的body需要维护到tree上
    if (configuration.body?.length) {
      for (let cmd of configuration.body) {
        maintainBodyComponent(cmd, configuration.id);
      }
    }
    return { ...state, componentTrees, componentConfigurations, activeComponentId: state.activeComponentId || configuration.id };
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