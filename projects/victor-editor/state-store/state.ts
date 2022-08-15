import { createFeatureSelector } from '@ngrx/store';
import { DynamicComponentMetadata } from 'victor-core';
import { ComponentTreeState } from './visual-editing/state';

export interface VictorDesignerState {
  activeComponentId?: string;
  componentMetadatas: { [id: string]: DynamicComponentMetadata };
  componentTrees: { [id: string]: ComponentTreeState };
}

export const VICTOR_DESIGNER_INITIAL_STATE: VictorDesignerState = {
  componentMetadatas: {},
  componentTrees: {},
  activeComponentId: null
}

export const victorDesignerStateKey: string = 'victorDesigner';

export const selectVictorDesignerState = createFeatureSelector<VictorDesignerState>(victorDesignerStateKey);