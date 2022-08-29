import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRunTimeModule, DynamicComponent } from 'victor-core';
import { TabsComponent } from './components/tabs/tabs.component';
import { TranslateModule } from '@ngx-translate/core';
import { TabComponent } from './components/tab/tab.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TabWrapperComponent } from './components/tab-wrapper/tab-wrapper.component';

@NgModule({
  declarations: [
    TabsComponent,
    TabComponent,
    TabWrapperComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    NzTabsModule
  ]
})
export class RunTimeModule implements ComponentRunTimeModule {

  getComponentType(type: string): Type<DynamicComponent> {
    console.log(`type type:`, type);
    switch (type) {
      case 'tabs':
        return TabsComponent;
      default:
        return null;
    }
  }

}
