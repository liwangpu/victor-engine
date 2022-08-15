import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { DynamicComponentMetadata } from 'victor-core';
import { VictorDesignerState } from '../state';
import { ComponentTreeState } from '../visual-editing';
import * as fromAction from './action';
import * as _ from 'lodash';

export const ons: ReducerTypes<VictorDesignerState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.setComponentMetadata, (state: VictorDesignerState, { id, metadata }) => {
    const componentTrees = { ...state.componentTrees };
    const componentMetadatas = { ...state.componentMetadatas };
    const maintainBodyComponent = (bodyMetadata: DynamicComponentMetadata, parentId: string) => {
      if (!componentTrees[bodyMetadata.id]) {
        const ctree: ComponentTreeState = { id: bodyMetadata.id, type: bodyMetadata.type, parentId };
        const parentTree = { ...componentTrees[parentId], body: componentTrees[parentId].body?.length ? [...componentTrees[parentId].body] : [] };
        componentTrees[bodyMetadata.id] = ctree;
        parentTree.body.push(bodyMetadata.id);
        componentTrees[parentId] = parentTree;
        if (bodyMetadata.body?.length) {
          for (let cmd of bodyMetadata.body) {
            maintainBodyComponent(cmd, bodyMetadata.id);
          }
        }
        componentMetadatas[bodyMetadata.id] = { ...bodyMetadata, body: [] };
      }
    };
    // 删除原组件body已经没有的组件
    const removeComponentIds = _.difference(componentTrees[metadata.id]?.body || [], metadata.body?.map(c => c.id) || []);
    if (removeComponentIds.length) {
      const removeComponent = (cid: string) => {
        const currentTree = componentTrees[cid];
        currentTree?.body?.forEach(bid => removeComponent(bid));
        delete componentTrees[cid];
        delete componentMetadatas[cid];
        const parentTree = { ...componentTrees[currentTree.parentId], body: componentTrees[currentTree.parentId].body?.length ? [...componentTrees[currentTree.parentId].body] : [] };
        const idx = parentTree.body.findIndex(d => d === cid);
        parentTree.body.splice(idx, 1);
        componentTrees[parentTree.id] = parentTree;
      };
      removeComponentIds.forEach(cid => removeComponent(cid));
    }
    // 容器组件的body需要维护到tree上
    if (metadata.body?.length) {
      for (let cmd of metadata.body) {
        maintainBodyComponent(cmd, id);
      }
    }

    componentMetadatas[id] = { ...metadata, body: [] };
    return { ...state, componentMetadatas, componentTrees };
  })
];