import { Injectable } from '@angular/core';
import { ComponentDescription, DynamicComponentRegistry } from 'victor-core';

@Injectable()
export class DynamicComponentRegistryService implements DynamicComponentRegistry {

  private componentDescription = new Map<string, ComponentDescription>();

  registry(des: ComponentDescription): void {
    this.componentDescription.set(des.type, des);
  }

  async getComponentDescription(type: string): Promise<ComponentDescription> {
    if (!type) { return null; }
    return this.componentDescription.get(type);
  }

  async getComponentDescriptions(): Promise<ComponentDescription[]> {
    return [...this.componentDescription.values()];
  }

}
