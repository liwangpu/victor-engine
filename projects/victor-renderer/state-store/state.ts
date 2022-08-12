import { createFeatureSelector } from '@ngrx/store';
import { DynamicComponentMetadata } from 'victor-core';
import { ComponentScope } from './component-scope/state';
// import { ComponentTreeState } from './visual-editing/state';

export interface VictorRendererState {
  componentScopes: { [id: string]: ComponentScope },
}

export const VICTOR_RENDERER_INITIAL_STATE: VictorRendererState = {
  componentScopes: {},
}

export const victorRendererStateKey: string = 'victorRenderer';

export const selectVictorRendererState = createFeatureSelector<VictorRendererState>(victorRendererStateKey);