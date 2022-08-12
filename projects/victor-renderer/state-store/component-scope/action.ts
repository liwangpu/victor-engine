import { createAction, props } from '@ngrx/store';
import { DynamicComponentMetadata } from 'victor-core';

export const setComponentScope = createAction('[victor-renderer] 设置组件scope', props<{ id: string, title: string, scopeName: string, scopeValue: { value: any, source?: any }, source: string }>());