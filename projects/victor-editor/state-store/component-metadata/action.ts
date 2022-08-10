import { createAction, props } from '@ngrx/store';
import { DynamicComponentMetadata } from 'victor-core';

export const setComponentMetadata = createAction('[victor-editor] 设置组件配置', props<{ id: string, metadata: DynamicComponentMetadata, source: string }>());