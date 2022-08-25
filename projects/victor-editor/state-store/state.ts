import { createFeatureSelector } from '@ngrx/store';
import { ComponentConfiguration, ComponentMetadata } from 'victor-core';
import { ComponentTreeState } from './visual-editing/state';

export interface VictorDesignerState {
  activeComponentId?: string;
  componentConfigurations: { [id: string]: ComponentConfiguration };
  componentTrees: { [id: string]: ComponentTreeState };
  componentMetadatas: { [id: string]: ComponentMetadata };
}

export const VICTOR_DESIGNER_INITIAL_STATE: VictorDesignerState = {
  componentConfigurations: {},
  componentTrees: {},
  componentMetadatas: {},
  activeComponentId: null
}

export const victorDesignerStateKey: string = 'victorDesigner';

export const selectVictorDesignerState = createFeatureSelector<VictorDesignerState>(victorDesignerStateKey);