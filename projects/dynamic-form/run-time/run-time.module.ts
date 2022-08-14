import { ComponentFactoryResolver, Inject, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent } from './components/text/text.component';
import { DynamicComponentRegistry, DYNAMIC_COMPONENT_REGISTRY } from 'victor-core';
import { TranslateService } from '@ngx-translate/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconDefinition } from '@ant-design/icons-angular';
import * as antIcon from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

const icons: Array<IconDefinition> = [antIcon.CloseCircleOutline];

@NgModule({
  declarations: [
    TextComponent
  ],
  imports: [
    CommonModule,
    NzInputModule,
    ReactiveFormsModule,
    FormsModule,
    NzIconModule.forChild(icons),
  ]
})
export class RunTimeModule {
  constructor(
    @Optional()
    @Inject(DYNAMIC_COMPONENT_REGISTRY)
    componentRegistry: DynamicComponentRegistry,
    cfr: ComponentFactoryResolver,
    translater: TranslateService
  ) {
    if (componentRegistry) {
      componentRegistry.registry({
        type: 'text',
        title: translater.instant(`dynamicComponent.text`),
        group: 'form',
        fac: cfr.resolveComponentFactory(TextComponent)
      });
    }
  }
}
