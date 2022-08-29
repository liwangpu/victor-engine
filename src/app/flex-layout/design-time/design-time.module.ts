import { NgModule, Type } from '@angular/core';
import { CommonModule as ShareCommonModule } from 'victor-editor-shared/common';
import { RowLayoutConfigurationComponent } from './row-layout-configuration/row-layout-configuration.component';
import { ComponentDesignPanel, ComponentDesignTimeModule } from 'victor-core';

@NgModule({
  declarations: [
    RowLayoutConfigurationComponent
  ],
  imports: [
    ShareCommonModule
  ]
})
export class DesignTimeModule implements ComponentDesignTimeModule {

  getComponentType(type: string): Type<ComponentDesignPanel> {
    return RowLayoutConfigurationComponent;
  }
}

