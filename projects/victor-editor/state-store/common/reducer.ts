import { ActionCreator, Creator, on, ReducerTypes } from '@ngrx/store';
import { FormDesignerState, FORM_DESIGNER_INITIAL_STATE } from '../state';
import { ComponentTreeState } from '../visual-editing';
import * as fromAction from './action';

export const ons: ReducerTypes<FormDesignerState, readonly ActionCreator<string, Creator<any[], object>>[]>[] = [
  on(fromAction.setDesignerState, (state: FormDesignerState, { state: newDate }) => {
    const componentIds = Object.keys(newDate.componentTree);
    const componentTrees: ComponentTreeState[] = componentIds.map(id => newDate.componentTree[id]);
    let pageTree = componentTrees.find(t => t.type === 'page');
    return { ...state, ...newDate, activeComponentId: pageTree?.id };
  }),
  on(fromAction.resetDesignerState, (state: FormDesignerState, { }) => {
    return { ...FORM_DESIGNER_INITIAL_STATE };
  })
];