import { createAction, props } from '@ngrx/store';
import { FormDesignerState } from '../state';

export const setDesignerState = createAction('[victor-editor] 设置设计器数据', props<{ state:FormDesignerState, source: string }>());