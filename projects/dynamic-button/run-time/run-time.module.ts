import { ComponentFactoryResolver, Inject, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponentRegistry, DYNAMIC_COMPONENT_REGISTRY } from 'victor-core';
import { TranslateService } from '@ngx-translate/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconDefinition } from '@ant-design/icons-angular';
import * as antIcon from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NormalButtonComponent } from './components/normal-button/normal-button.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

const icons: Array<IconDefinition> = [antIcon.CloseCircleOutline];

@NgModule({
  declarations: [
    NormalButtonComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
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
        type: 'button',
        title: translater.instant(`dynamicComponent.button`),
        group: 'button',
        fac: cfr.resolveComponentFactory(NormalButtonComponent)
      });
    }
  }
}
