import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { RendererModule } from 'victor-renderer/renderer';

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    RendererModule
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }
