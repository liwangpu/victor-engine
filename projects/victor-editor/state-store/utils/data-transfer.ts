import { ComponentConfiguration } from 'victor-core';
import { VictorDesignerState, VICTOR_DESIGNER_INITIAL_STATE } from '../state';
import { ComponentTreeState } from '../visual-editing';
import * as _ from 'lodash';

type NestedComponentMetadata = ComponentTreeState & ComponentConfiguration;

export function flatComponentTree(md: ComponentConfiguration): { [id: string]: ComponentTreeState } {
  if (!md) { return {}; }
  const componentTrees = {};
  const tree: ComponentTreeState = { id: md.id, type: md.type, body: md.body?.length ? md.body.map(c => c.id) : [] };
  componentTrees[md.id] = tree;
  const maintainBodyComponent = (bodyMd: ComponentConfiguration, parentId: string) => {
    if (!componentTrees[bodyMd.id]) {
      const ctree: ComponentTreeState = { id: bodyMd.id, type: bodyMd.type, parentId, body: bodyMd.body?.length ? bodyMd.body.map(c => c.id) : [] };
      componentTrees[ctree.id] = ctree;
      bodyMd.body?.forEach(cmd => maintainBodyComponent(cmd, bodyMd.id));
    }
  };

  md.body?.forEach(cmd => maintainBodyComponent(cmd, md.id));
  return componentTrees;
}

export function nestComponentTree(state: VictorDesignerState): ComponentConfiguration {
  if (!state?.componentTrees) { return null; }
  const componentIds = Object.keys(state.componentTrees);
  const componentTrees: ComponentTreeState[] = componentIds.map(id => state.componentTrees[id]);
  let pageTree = componentTrees.find(t => t.type === 'page');
  if (!pageTree) { return null; }
  pageTree = { ...pageTree };
  const generateComponentMetadata = (tree: NestedComponentMetadata) => {
    const bodyIds = tree.body || [];
    const md = state.componentConfigurations[tree.id];
    if (md) {
      _.merge(tree, { ...md, type: tree.type, id: tree.id });
    }
    const body: ComponentConfiguration[] = [];
    bodyIds.forEach(cid => {
      let ctree = state.componentTrees[cid];
      if (!ctree) { return; }
      ctree = { ...ctree };
      generateComponentMetadata(ctree as NestedComponentMetadata);
      body.push(ctree as any);
    });

    if (body.length) {
      tree.body = body as any;
    } else {
      delete tree.body;
    }
    delete tree.parentId;
  };

  generateComponentMetadata(pageTree as NestedComponentMetadata);
  return pageTree as any;
}

export function generateDesignState(metadata: ComponentConfiguration): VictorDesignerState {
  const state = _.cloneDeep(VICTOR_DESIGNER_INITIAL_STATE);
  if (!metadata) { return state; }
  const componentTrees = {};
  const componentConfigurations = {};
  const generateComponentMetadataAndTree = (md: ComponentConfiguration, parentId: string) => {
    const ctree: ComponentTreeState = { id: md.id, type: md.type };
    if (parentId) {
      ctree.parentId = parentId;
    }
    componentTrees[md.id] = ctree;
    md = { ...md };
    componentConfigurations[md.id] = md;
    const bodyMetadatas: ComponentConfiguration[] = md.body?.length ? md.body : [];
    const bodyIds = bodyMetadatas.map(c => c.id);
    ctree.body = bodyIds;
    md.body = [];
    bodyMetadatas.forEach(bmd => {
      generateComponentMetadataAndTree(bmd, md.id);
    });
  };
  generateComponentMetadataAndTree(metadata, null);
  state.componentTrees = componentTrees;
  state.componentConfigurations = componentConfigurations;
  return state;
}