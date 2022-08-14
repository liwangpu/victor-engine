import { createAction, props } from '@ngrx/store';
import { ComponentMetadataDescription, DynamicComponentMetadata } from 'victor-core';

export const setComponentMetadata = createAction('[victor-renderer] 设置组件元数据信息', props<{ id: string, metadata: DynamicComponentMetadata, description: ComponentMetadataDescription, source: string }>());

