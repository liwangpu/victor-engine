import { createAction, props } from '@ngrx/store';
import { ComponentMetadata, ComponentConfiguration } from 'victor-core';

export const setComponentMetadata = createAction('[victor-editor] 设置组件元数据信息', props<{ id: string, metadata: ComponentMetadata, source: string }>());

