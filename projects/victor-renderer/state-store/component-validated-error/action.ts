import { createAction, props } from '@ngrx/store';
import { ComponentMetadataDescription, DynamicComponentMetadata } from 'victor-core';

export const setComponentValidatedError = createAction('[victor-renderer] 设置组件校验错误信息', props<{ id: string, errors: { [scopeName: string]: string }, source: string }>());

