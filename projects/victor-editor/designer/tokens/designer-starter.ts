import { InjectionToken } from '@angular/core';
import { DynamicComponentMetadata } from 'victor-core';

export interface EditorHandler {
  save(): Promise<void>;
}

export interface DesignerStarter {
  getSchema(): Promise<DynamicComponentMetadata>;
  saveSchema(schema: DynamicComponentMetadata): Promise<void>;
  registryEditorHandler(handler: EditorHandler): void;
}

export const DESIGNER_STARTER = new InjectionToken<DesignerStarter>('designer starter');