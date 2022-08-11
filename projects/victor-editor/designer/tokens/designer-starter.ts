import { InjectionToken } from '@angular/core';

export interface EditorHandler {
  save(): Promise<void>;
}

export interface DesignerStarter {
  getSchema(): Promise<any>;
  saveSchema(schema: any): Promise<void>;
  registryEditorHandler(handler: EditorHandler): void;
}

export const DESIGNER_STARTER = new InjectionToken<DesignerStarter>('designer starter');