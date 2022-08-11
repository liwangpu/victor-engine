import { createAction, props } from '@ngrx/store';
import { FormDesignerState } from '../state';

export const setDesignerState = createAction('[victor-editor] 设置设计器状态', props<{ state: FormDesignerState, source: string }>());
export const resetDesignerState = createAction('[victor-editor] 清空设计器状态', props<{ source: string }>());