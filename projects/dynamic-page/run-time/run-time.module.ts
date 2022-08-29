import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './components/page/page.component';
import { ComponentRunTimeModule, DynamicComponent } from 'victor-core';
import { PageContentComponent } from './components/page-content/page-content.component';

@NgModule({
  declarations: [
    PageComponent,
    PageContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RunTimeModule implements ComponentRunTimeModule {

  getComponentType(type: string): Type<DynamicComponent> {
    switch (type) {
      case 'page':
        return PageComponent;
      default:
        return null;
    }
  }
}
