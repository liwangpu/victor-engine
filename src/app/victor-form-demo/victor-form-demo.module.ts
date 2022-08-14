import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VictorFormDemoRoutingModule } from './victor-form-demo-routing.module';
import { JsonEditorModule } from '../json-editor/json-editor.module';
import { HomeComponent } from './components/home/home.component';
import { RegistrationModule } from 'victor-core/registration';
import { RunTimeModule as FormRunTimeModule } from 'dynamic-form/run-time';
import { FormModule as VictorFormModule } from 'victor-renderer/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  ]
})
export class VictorFormDemoModule { }
