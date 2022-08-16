import { ComponentFactoryResolver, Inject, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VictorFormDemoRoutingModule } from './victor-form-demo-routing.module';
import { JsonEditorModule } from '../json-editor';
import { HomeComponent } from './components/home/home.component';
import { FormModule as VictorFormModule } from 'victor-renderer/form';
// import { RunTimeModule as TabsRunTimeModule } from 'dynamic-tabs/run-time';
// import { RunTimeModule as FormRunTimeModule } from 'dynamic-form/run-time';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconDefinition } from '@ant-design/icons-angular';
import * as antIcon from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DynamicComponentRegistry, DYNAMIC_COMPONENT_REGISTRY, DYNAMIC_VALIDATOR } from 'victor-core';
import { TextRequiredValidatorService } from './services/text-required-validator.service';
import { SpecifyTextRequiredValidatorService } from './services/specify-required-validator.service';
import { MyPasswordComponent } from './components/my-password/my-password.component';
import { TranslateService } from '@ngx-translate/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NativeComponetMarketModule } from 'victor-core/native-componet-market';
import { WeakPasswordCheckValidatorService } from './services/weak-password-check-validator.service';
import { RunTimeModule as TabsRunTimeModule } from 'dynamic-tabs/run-time';
import { RunTimeModule as FormRunTimeModule } from 'dynamic-form/run-time';

const icons: Array<IconDefinition> = [antIcon.CloseCircleOutline];

@NgModule({
  declarations: [
    HomeComponent,
    MyPasswordComponent
  ],
  imports: [
    CommonModule,
    VictorFormDemoRoutingModule,
    JsonEditorModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule.forChild(icons),
    // victor engine
    NativeComponetMarketModule,
    VictorFormModule,
    FormRunTimeModule,
    TabsRunTimeModule
  ],
  providers: [
    // { provide: DYNAMIC_VALIDATOR, useClass: TextRequiredValidatorService, multi: true },
    // { provide: DYNAMIC_VALIDATOR, useClass: SpecifyTextRequiredValidatorService, multi: true },
    { provide: DYNAMIC_VALIDATOR, useClass: WeakPasswordCheckValidatorService, multi: true },
  ]
})
export class VictorFormDemoModule {
  constructor(
    @Optional()
    @Inject(DYNAMIC_COMPONENT_REGISTRY)
    componentRegistry: DynamicComponentRegistry,
    cfr: ComponentFactoryResolver,
    translater: TranslateService
  ) {
    if (componentRegistry) {
      componentRegistry.registry({
        type: 'my-password',
        title: translater.instant(`dynamicComponent.password`),
        group: 'form',
        fac: cfr.resolveComponentFactory(MyPasswordComponent)
      });
    }
  }
}
