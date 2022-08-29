import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RendererComponent } from './components/renderer/renderer.component';
import { StateStoreModule } from 'victor-renderer/state-store';
import { ComponentDiscoveryService } from 'victor-core';
import { ValidatorModule } from 'victor-renderer/validator';

@NgModule({
  declarations: [
    RendererComponent
  ],
  imports: [
    CommonModule,
    StateStoreModule,
    ValidatorModule
  ],
  exports: [
    RendererComponent
  ],
  providers: [
    ComponentDiscoveryService
  ]
})
export class RendererModule { }
