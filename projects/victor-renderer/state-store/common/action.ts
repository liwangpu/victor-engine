import { createAction, props } from '@ngrx/store';
import { ComponentMetadata, ComponentConfiguration } from 'victor-core';

export const setComponentMetadata = createAction('[victor-renderer] 设置组件元数据信息', props<{ id: string, configuration: ComponentConfiguration, metadata: ComponentMetadata, source: string }>());

export const eventBindingTrigger = createAction('[victor-renderer] 触发事件', props<{ targetComponentId: string, sourceComponentId: string, event: string, action: string, params?: any, source: string }>());