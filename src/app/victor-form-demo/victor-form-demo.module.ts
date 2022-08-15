import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VictorFormDemoRoutingModule } from './victor-form-demo-routing.module';
import { JsonEditorModule } from '../json-editor/json-editor.module';
import { HomeComponent } from './components/home/home.component';
import { RegistrationModule } from 'victor-core/registration';
import { RunTimeModule as FormRunTimeModule } from 'dynamic-form/run-time';
import { FormModule as VictorFormModule } from 'victor-renderer/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RunTimeModule as TabsRunTimeModule } from 'dynamic-tabs/run-time';
import { DYNAMIC_VALIDATOR } from 'victor-core';
import { TextRequiredValidatorService } from './services/text-required-validator.service';
import { SpecifyTextRequiredValidatorService } from './services/specify-required-validator.service copy';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    VictorFormDemoRoutingModule,
    JsonEditorModule,
    FormsModule,
    ReactiveFormsModule,
    // victor engine
    RegistrationModule,
    VictorFormModule,
    FormRunTimeModule,
    TabsRunTimeModule
  ],
  providers: [
    // { provide: DYNAMIC_VALIDATOR, useClass: TextRequiredValidatorService, multi: true },
    // { provide: DYNAMIC_VALIDATOR, useClass: SpecifyTextRequiredValidatorService, multi: true },
  ]
})
export class VictorFormDemoModule { }
