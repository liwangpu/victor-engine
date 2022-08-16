import { createAction, props } from '@ngrx/store';
import { ComponentConfiguration } from 'victor-core';

export const setComponentScope = createAction('[victor-renderer] 设置组件scope', props<{ pageId: string, id: string, title: string, componentType: string, scopeName: string, scopeValue: any, scopeSource: any, source: string }>());