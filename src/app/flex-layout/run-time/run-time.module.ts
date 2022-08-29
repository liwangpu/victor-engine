import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowLayoutComponent } from './row-layout/row-layout.component';
import { LayoutWrapperComponent } from './layout-wrapper/layout-wrapper.component';
import { RowLayoutContainerComponent } from './row-layout-container/row-layout-container.component';
import { ComponentRunTimeModule, DynamicComponent } from 'victor-core';

@NgModule({
  declarations: [
    RowLayoutComponent,
    LayoutWrapperComponent,
    RowLayoutContainerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RunTimeModule implements ComponentRunTimeModule {

  getComponentType(type: string): Type<DynamicComponent> {
    return RowLayoutComponent;
  }
}

