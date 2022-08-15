import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RendererComponent } from './components/renderer/renderer.component';
import { StateStoreModule } from 'victor-renderer/state-store';
import { ValidatorModule } from 'victor-renderer/validator';
import { COMPONENT_ID_GENERATOR } from 'victor-core';
import { ComponentIdGeneratorService } from './services/component-id-generator.service';

@NgModule({
  declarations: [
    RendererComponent
  ],
  imports: [
    CommonModule,
    StateStoreModule,
    ValidatorModule
  ],
  providers: [
    { provide: COMPONENT_ID_GENERATOR, useClass: ComponentIdGeneratorService },
  ],
  exports: [
    RendererComponent
  ]
})
export class RendererModule { }
