import { createFeatureSelector } from '@ngrx/store';
import { ComponentMetadata, ComponentConfiguration } from 'victor-core';
import { ComponentScope } from './component-scope/state';

export interface VictorRendererState {
  componentScopes: { [id: string]: ComponentScope };
  componentValidatedErrors: { [id: string]: any };
  componentConfigurations: { [id: string]: ComponentConfiguration };
  componentMetadatas: { [id: string]: ComponentMetadata };
}

export const VICTOR_RENDERER_INITIAL_STATE: VictorRendererState = {
  componentScopes: {},
  componentValidatedErrors: {},
  componentConfigurations: {},
  componentMetadatas: {}
}

export const victorRendererStateKey: string = 'victorRenderer';

export const selectVictorRendererState = createFeatureSelector<VictorRendererState>(victorRendererStateKey);