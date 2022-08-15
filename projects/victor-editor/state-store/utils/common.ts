import { DynamicComponentMetadata } from 'victor-core';
import { VictorDesignerState } from '../state';
import { ComponentTreeState } from '../visual-editing';

// export function removeComponent(state: VictorDesignerState, id: string, fn: (childComponentId: string) => void): void {
//   const componentTree = state.componentTree;
//   if (!id || !componentTree[id]) { return; }
//   const component = componentTree[id];
//   if (component.body?.length) {
//     component.body.forEach(cid => {
//       removeComponent(state, cid, fn);
//       fn(cid);
//     });
//   }
//   fn(id);
// }

export function removeComponent(trees: { [id: string]: ComponentTreeState }, metadatas: { [id: string]: DynamicComponentMetadata }, id: string): void {

}