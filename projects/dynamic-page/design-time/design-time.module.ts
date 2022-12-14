import { NgModule, Type } from '@angular/core';
import { PageConfigurationComponent } from './page-configuration/page-configuration.component';
import { CommonModule as ShareCommonModule } from 'victor-editor-shared/common';
import { ComponentDesignPanel, ComponentDesignTimeModule } from 'victor-core';


@NgModule({
  declarations: [
    PageConfigurationComponent
  ],
  imports: [
    ShareCommonModule
  ]
})
export class DesignTimeModule implements ComponentDesignTimeModule {

  getComponentType(type: string): Type<ComponentDesignPanel> {
    switch (type) {
      case 'page':
        return PageConfigurationComponent;
      default:
        return null;
    }
  }
}

