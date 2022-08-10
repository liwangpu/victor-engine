import { DynamicComponentMetadata } from 'victor-core';
import { ComponentTreeState } from '../visual-editing';

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