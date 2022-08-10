import { Injectable } from '@angular/core';
import { ComponentDesignPanelDescription, ComponentDesignPanelRegistry } from 'victor-core';

@Injectable()
export class ComponentDesignPanelRegistryService implements ComponentDesignPanelRegistry {

  private configurationDescription = new Map<string, ComponentDesignPanelDescription>();

  registry(des: ComponentDesignPanelDescription): void {
    this.configurationDescription.set(des.type, des);
  }

  async getComponentDescription(type: string): Promise<ComponentDesignPanelDescription> {
    if (!type) { return null; }
    return this.configurationDescription.get(type);
  }

  async getComponentDescriptions(): Promise<ComponentDesignPanelDescription[]> {
    return [...this.configurationDescription.values()];
  }
}
