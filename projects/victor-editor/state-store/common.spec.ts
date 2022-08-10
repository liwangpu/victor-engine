import { DynamicComponentMetadata } from 'victor-core';
import { ComponentTreeState } from './visual-editing';

export type PartialComponentTreeState = { [P in keyof ComponentTreeState]?: ComponentTreeState[P] };
export type PartialDynamicComponentMetadata = { [P in keyof DynamicComponentMetadata]?: DynamicComponentMetadata[P] };