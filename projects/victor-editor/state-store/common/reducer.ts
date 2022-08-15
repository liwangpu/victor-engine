import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { VictorDesignerState, VICTOR_DESIGNER_INITIAL_STATE } from '../state';
import { ComponentTreeState } from '../visual-editing';
import * as fromAction from './action';

export const ons: ReducerTypes<VictorDesignerState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.setDesignerState, (state: VictorDesignerState, { state: newDate }) => {
    const componentIds = Object.keys(newDate.componentTrees);
    const componentTrees: ComponentTreeState[] = componentIds.map(id => newDate.componentTrees[id]);
    let pageTree = componentTrees.find(t => t.type === 'page');
    return { ...state, ...newDate, activeComponentId: pageTree?.id };
  }),
  on(fromAction.resetDesignerState, (state: VictorDesignerState, { }) => {
    return { ...VICTOR_DESIGNER_INITIAL_STATE };
  })
];