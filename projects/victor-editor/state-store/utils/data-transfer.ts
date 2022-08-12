import { DynamicComponentMetadata } from 'victor-core';
import { VictorDesignerState, VICTOR_DESIGNER_INITIAL_STATE } from '../state';
import { ComponentTreeState } from '../visual-editing';
import * as _ from 'lodash';

type NestedComponentMetadata = ComponentTreeState & DynamicComponentMetadata;

export function flatComponentTree(md: DynamicComponentMetadata): { [id: string]: ComponentTreeState } {
  if (!md) { return {}; }
  const componentTree = {};
  const tree: ComponentTreeState = { id: md.id, type: md.type, body: md.body?.length ? md.body.map(c => c.id) : [] };
  componentTree[md.id] = tree;
  const maintainBodyComponent = (bodyMd: DynamicComponentMetadata, parentId: string) => {
    if (!componentTree[bodyMd.id]) {
      const ctree: ComponentTreeState = { id: bodyMd.id, type: bodyMd.type, parentId, body: bodyMd.body?.length ? bodyMd.body.map(c => c.id) : [] };
      componentTree[ctree.id] = ctree;
      bodyMd.body?.forEach(cmd => maintainBodyComponent(cmd, bodyMd.id));
    }
  };

  md.body?.forEach(cmd => maintainBodyComponent(cmd, md.id));
  return componentTree;
}

export function nestComponentTree(state: VictorDesignerState): DynamicComponentMetadata {
  if (!state?.componentTree) { return null; }
  const componentIds = Object.keys(state.componentTree);
  const componentTrees: ComponentTreeState[] = componentIds.map(id => state.componentTree[id]);
  let pageTree = componentTrees.find(t => t.type === 'page');
  if (!pageTree) { return null; }
  pageTree = { ...pageTree };
  const generateComponentMetadata = (tree: NestedComponentMetadata) => {
    const bodyIds = tree.body || [];
    const md = state.componentMetadata[tree.id];
    if (md) {
      _.merge(tree, { ...md, type: tree.type, id: tree.id });
    }
    const body: DynamicComponentMetadata[] = [];
    bodyIds.forEach(cid => {
      let ctree = state.componentTree[cid];
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

export function generateDesignState(metadata: DynamicComponentMetadata): VictorDesignerState {
  const state = _.cloneDeep(VICTOR_DESIGNER_INITIAL_STATE);
  if (!metadata) { return state; }
  const componentTree = {};
  const componentMetadata = {};
  const generateComponentMetadataAndTree = (md: DynamicComponentMetadata, parentId: string) => {
    const ctree: ComponentTreeState = { id: md.id, type: md.type };
    if (parentId) {
      ctree.parentId = parentId;
    }
    componentTree[md.id] = ctree;
    md = { ...md };
    componentMetadata[md.id] = md;
    const bodyMetadatas: DynamicComponentMetadata[] = md.body?.length ? md.body : [];
    const bodyIds = bodyMetadatas.map(c => c.id);
    ctree.body = bodyIds;
    md.body = [];
    bodyMetadatas.forEach(bmd => {
      generateComponentMetadataAndTree(bmd, md.id);
    });
  };
  generateComponentMetadataAndTree(metadata, null);
  state.componentTree = componentTree;
  state.componentMetadata = componentMetadata;
  return state;
}