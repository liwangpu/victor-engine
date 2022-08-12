import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RendererComponent } from './components/renderer/renderer.component';
import { DYNAMIC_COMPONENT_RENDERER } from 'victor-core';
import { DynamicComponentRendererService } from './services/dynamic-component-renderer.service';
import { StateStoreModule } from 'victor-renderer/state-store';

@NgModule({
  declarations: [
    RendererComponent
  ],
  imports: [
    CommonModule,
    StateStoreModule,
  ],
  providers: [
    { provide: DYNAMIC_COMPONENT_RENDERER, useClass: DynamicComponentRendererService },
  ],
  exports: [
    RendererComponent
  ]
})
export class RendererModule { }
