import { createFeatureSelector } from '@ngrx/store';
import { ComponentConfiguration } from 'victor-core';
import { ComponentTreeState } from './visual-editing/state';

export interface VictorDesignerState {
  activeComponentId?: string;
  componentConfigurations: { [id: string]: ComponentConfiguration };
  componentTrees: { [id: string]: ComponentTreeState };
}

export const VICTOR_DESIGNER_INITIAL_STATE: VictorDesignerState = {
  componentConfigurations: {},
  componentTrees: {},
  activeComponentId: null
}

export const victorDesignerStateKey: string = 'victorDesigner';

export const selectVictorDesignerState = createFeatureSelector<VictorDesignerState>(victorDesignerStateKey);