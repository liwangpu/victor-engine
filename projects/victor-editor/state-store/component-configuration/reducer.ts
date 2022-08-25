import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { ComponentConfiguration } from 'victor-core';
import { VictorDesignerState } from '../state';
import { ComponentTreeState } from '../visual-editing';
import * as fromAction from './action';
import * as _ from 'lodash';

export const ons: ReducerTypes<VictorDesignerState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.setComponentConfiguration, (state: VictorDesignerState, { id, configuration }) => {
    const componentTrees = { ...state.componentTrees };
    const componentConfigurations = { ...state.componentConfigurations };
    // configuration={...configuration,componentConfigurations[id]}
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
    // 删除原组件body已经没有的组件
    const removeComponentIds = _.difference(componentTrees[configuration.id]?.body || [], configuration.body?.map(c => c.id) || []);
    if (removeComponentIds.length) {
      const removeComponent = (cid: string) => {
        const currentTree = componentTrees[cid];
        currentTree?.body?.forEach(bid => removeComponent(bid));
        delete componentTrees[cid];
        delete componentConfigurations[cid];
        const parentTree = { ...componentTrees[currentTree.parentId], body: componentTrees[currentTree.parentId].body?.length ? [...componentTrees[currentTree.parentId].body] : [] };
        const idx = parentTree.body.findIndex(d => d === cid);
        parentTree.body.splice(idx, 1);
        componentTrees[parentTree.id] = parentTree;
      };
      removeComponentIds.forEach(cid => removeComponent(cid));
    }
    // 容器组件的body需要维护到tree上
    if (configuration.body?.length) {
      for (let cmd of configuration.body) {
        maintainBodyComponent(cmd, id);
      }
    }

    componentConfigurations[id] = { ...configuration, body: [] };
    return { ...state, componentConfigurations, componentTrees };
  })
];