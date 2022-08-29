import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RendererComponent } from './components/renderer/renderer.component';
import { StateStoreModule } from 'victor-renderer/state-store';
import { ComponentDiscoveryService } from 'victor-core';

@NgModule({
  declarations: [
    RendererComponent
  ],
  imports: [
    CommonModule,
    StateStoreModule
  ],
  exports: [
    RendererComponent
  ],
  providers: [
    ComponentDiscoveryService
  ]
})
export class RendererModule { }
