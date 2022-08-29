import { forwardRef, NgModule } from '@angular/core';
import { ComponentDescription, ComponentDesignTimeModule, ComponentMarket, ComponentRunTimeModule, COMPONENT_MARKET } from 'victor-core';

@NgModule({
  providers: [
    { provide: COMPONENT_MARKET, useExisting: forwardRef(() => LocalMarketModule), multi: true }
  ]
})
export class LocalMarketModule implements ComponentMarket {

  name: string = 'video-market';

  async getComponentDescriptions(): Promise<ComponentDescription[]> {
    return [
      {
        type: 'video',
        title: '视频播放器',
        group: 'other'
      }
    ];
  }

  async getComponentDescription(type: string): Promise<ComponentDescription> {
    const des = await this.getComponentDescriptions();
    return des.find(c => c.type === type);
  }

  loadComponentRunTimeModule(type: string): Promise<ComponentRunTimeModule> {
    return import('./run-time/run-time.module').then(m => m.RunTimeModule as any);
  }

  loadComponentDesignTimeModule(type: string): Promise<ComponentDesignTimeModule> {
    return import('./design-time/design-time.module').then(m => m.DesignTimeModule as any);
  }
}
