import { createAction, props } from '@ngrx/store';
import { ComponentConfiguration } from 'victor-core';

export const addNewComponent = createAction('[victor-editor] 添加新组件', props<{ configuration: ComponentConfiguration, parentId: string, index: number, source: string }>());
export const activeComponent = createAction('[victor-editor] 激活组件', props<{ id: string, source: string }>());
export const moveComponent = createAction('[victor-editor] 移动组件', props<{ id: string, parentId: string, index: number, source: string }>());
