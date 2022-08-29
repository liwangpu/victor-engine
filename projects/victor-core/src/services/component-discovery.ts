import { createNgModuleRef, Inject, Injectable, Injector, NgModuleRef, Optional } from '@angular/core';
import { ComponentDesignTimeModule } from '../tokens';
import { ComponentDescription, ComponentMarket, COMPONENT_MARKET } from '../tokens/common/component-market';
import { ComponentRunTimeModule } from '../tokens/run-time/component-run-time-module';

@Injectable()
export class ComponentDiscoveryService {

  private readonly componentTypeMarketMap = new Map<string, ComponentMarket>();
  private readonly componentTypeRunTimeModuleRefMap = new Map<string, NgModuleRef<ComponentRunTimeModule>>();
  private readonly componentTypeDesignTimeModuleRefMap = new Map<string, NgModuleRef<ComponentDesignTimeModule>>();
  constructor(
    @Optional()
    @Inject(COMPONENT_MARKET)
    protected markets: ComponentMarket[],
    protected injector: Injector
  ) {
    // console.log(`markets:`, this.markets);
  }

  async loadComponentRunTimeModuleRef(type: string): Promise<NgModuleRef<ComponentRunTimeModule>> {
    if (this.componentTypeRunTimeModuleRefMap.has(type)) {
      return this.componentTypeRunTimeModuleRefMap.get(type);
    }
    if (!this.componentTypeMarketMap.has(type)) {
      const des = await this.getComponentDescription(type);
      if (!des) {
        console.error(`没有在市场找到类型为${type}的组件定义`);
        return null;
      }
    }

    const market = this.componentTypeMarketMap.get(type);
    if (!market) { return null; }
    const module = await market.loadComponentRunTimeModule(type);
    const mRef = createNgModuleRef<ComponentRunTimeModule>(module as any, this.injector);
    if (!mRef) { return mRef; }
    this.componentTypeRunTimeModuleRefMap.set(type, mRef);
    return mRef;
  }

  async loadComponentDesignTimeModuleRef(type: string): Promise<NgModuleRef<ComponentDesignTimeModule>> {
    if (this.componentTypeDesignTimeModuleRefMap.has(type)) {
      return this.componentTypeDesignTimeModuleRefMap.get(type);
    }
    if (!this.componentTypeMarketMap.has(type)) {
      const des = await this.getComponentDescription(type);
      if (!des) {
        console.error(`没有在市场找到类型为${type}的组件配置定义`);
        return null;
      }
    }

    const market = this.componentTypeMarketMap.get(type);
    if (!market) { return null; }
    const module = await market.loadComponentDesignTimeModule(type);
    const mRef = createNgModuleRef<ComponentDesignTimeModule>(module as any, this.injector);
    if (!mRef) { return mRef; }
    this.componentTypeDesignTimeModuleRefMap.set(type, mRef);
    return mRef;
  }

  async getComponentDescriptions(): Promise<ComponentDescription[]> {
    const descriptions: ComponentDescription[] = [];
    if (!this.markets?.length) { return descriptions; }
    for (let mk of this.markets) {
      const des = await mk.getComponentDescriptions();
      des.forEach(d => {
        descriptions.push({ ...d, market: mk.name });
        this.componentTypeMarketMap.set(d.type, mk);
      });
    }
    return descriptions;
  }

  async getComponentDescription(type: string): Promise<ComponentDescription> {
    if (!this.markets?.length) { return null; }
    for (let mk of this.markets) {
      const d = await mk.getComponentDescription(type);
      if (!d) { return null; }
      if (d.type === type) {
        this.componentTypeMarketMap.set(d.type, mk);
        return { ...d, market: mk.name };
      }
    }
    return null;
  }

}
