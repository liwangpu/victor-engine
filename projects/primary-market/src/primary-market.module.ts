import { forwardRef, NgModule } from '@angular/core';
import { ComponentDescription, ComponentDesignTimeModule, ComponentMarket, ComponentRunTimeModule, COMPONENT_MARKET } from 'victor-core';
import { ComponentPackageDetail, PRIMARY_PACKAGES } from './primary-components';

@NgModule({
  providers: [
    { provide: COMPONENT_MARKET, useExisting: forwardRef(() => PrimaryMarketModule), multi: true }
  ]
})
export class PrimaryMarketModule implements ComponentMarket {
  readonly name: string = 'primary';
  private readonly componentMap = new Map<string, ComponentPackageDetail>(PRIMARY_PACKAGES.map(p => ([p.type, p])));

  async loadComponentRunTimeModule(type: string): Promise<ComponentRunTimeModule> {
    const detail = this.componentMap.get(type);
    if (!detail) { return Promise.resolve(null); }
    switch (detail.package) {
      case 'dynamic-button':
        return import(/* webpackPrefetch:true */'dynamic-button/run-time/run-time.module').then(m => m.RunTimeModule as any);
      case 'dynamic-page':
        return import(/* webpackPrefetch:true */'dynamic-page/run-time/run-time.module').then(m => m.RunTimeModule as any);
      case 'dynamic-tabs':
        return import(/* webpackPrefetch:true */'dynamic-tabs/run-time/run-time.module').then(m => m.RunTimeModule as any);
      default:
        return Promise.resolve(null);
    }
  }

  async loadComponentDesignTimeModule(type: string): Promise<ComponentDesignTimeModule> {
    const detail = this.componentMap.get(type);
    if (!detail?.designTime) { return Promise.resolve(null); }
    switch (detail.package) {
      case 'dynamic-button':
        return import(/* */'dynamic-button/design-time/design-time.module').then(m => m.DesignTimeModule as any);
      case 'dynamic-page':
        return import(/* */'dynamic-page/design-time/design-time.module').then(m => m.DesignTimeModule as any);
      case 'dynamic-tabs':
        return import(/* */'dynamic-tabs/design-time/design-time.module').then(m => m.DesignTimeModule as any);
      default:
        return Promise.resolve(null);
    }
  }

  async getComponentDescription(type: string): Promise<ComponentDescription> {
    const detail = this.componentMap.get(type);
    return detail ? { type: detail.type, title: detail.title, group: detail.group } : null;
  }

  async getComponentDescriptions(): Promise<ComponentDescription[]> {
    return PRIMARY_PACKAGES.map(p => ({ type: p.type, title: p.title, group: p.group }));
  }
}
