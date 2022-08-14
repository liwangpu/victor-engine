import { createFeatureSelector } from '@ngrx/store';
import { ComponentMetadataDescription, DynamicComponentMetadata } from 'victor-core';
import { ComponentScope } from './component-scope/state';

export interface VictorRendererState {
  componentScopes: { [id: string]: ComponentScope };
  componentValidatedErrors: { [id: string]: any };
  componentMetadatas: { [id: string]: DynamicComponentMetadata };
  componentDescriptions: { [id: string]: ComponentMetadataDescription };
}

export const VICTOR_RENDERER_INITIAL_STATE: VictorRendererState = {
  componentScopes: {},
  componentValidatedErrors: {},
  componentMetadatas: {},
  componentDescriptions: {}
}

export const victorRendererStateKey: string = 'victorRenderer';

export const selectVictorRendererState = createFeatureSelector<VictorRendererState>(victorRendererStateKey);