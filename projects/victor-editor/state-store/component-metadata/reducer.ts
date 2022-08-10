import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { DynamicComponentMetadata } from 'victor-core';
import { FormDesignerState } from '../state';
import { ComponentTreeState } from '../visual-editing';
import * as fromAction from './action';

export const ons: ReducerTypes<FormDesignerState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.setComponentMetadata, (state: FormDesignerState, { id, metadata }) => {
    const componentTree = { ...state.componentTree };
    const componentMetadata = { ...state.componentMetadata };
    const maintainBodyComponent = (bodyMetadata: DynamicComponentMetadata, parentId: string) => {
      if (!componentTree[bodyMetadata.id]) {
        const ctree: ComponentTreeState = { id: bodyMetadata.id, type: bodyMetadata.type, parentId };
        const parentTree = { ...componentTree[parentId], body: componentTree[parentId].body?.length ? [...componentTree[parentId].body] : [] };
        componentTree[bodyMetadata.id] = ctree;
        parentTree.body.push(bodyMetadata.id);
        componentTree[parentId] = parentTree;
        if (bodyMetadata.body?.length) {
          for (let cmd of bodyMetadata.body) {
            maintainBodyComponent(cmd, bodyMetadata.id);
          }
        }
        componentMetadata[bodyMetadata.id] = { ...bodyMetadata, body: [] };
      }
    };
    // 容器组件的body需要维护到tree上
    if (metadata.body?.length) {
      for (let cmd of metadata.body) {
        maintainBodyComponent(cmd, id);
      }
    }
  
    componentMetadata[id] = {...metadata,body:[]};
    return { ...state, componentMetadata, componentTree };
  })
];