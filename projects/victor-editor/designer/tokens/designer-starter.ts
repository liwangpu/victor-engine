import { InjectionToken } from '@angular/core';
import { ComponentConfiguration } from 'victor-core';

export interface EditorHandler {
  save(): Promise<void>;
}

export interface DesignerStarter {
  getSchema(): Promise<ComponentConfiguration>;
  saveSchema(schema: ComponentConfiguration): Promise<void>;
  registryEditorHandler(handler: EditorHandler): void;
}

export const DESIGNER_STARTER = new InjectionToken<DesignerStarter>('designer starter');