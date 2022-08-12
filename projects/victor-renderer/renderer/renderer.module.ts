import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RendererComponent } from './components/renderer/renderer.component';
import { DYNAMIC_COMPONENT_RENDERER } from 'victor-core';
import { DynamicComponentRendererService } from './services/dynamic-component-renderer.service';

@NgModule({
  declarations: [
    RendererComponent
  ],
  imports: [
    CommonModule,
  ],
  providers:[
    { provide: DYNAMIC_COMPONENT_RENDERER, useClass: DynamicComponentRendererService },
  ],
  exports: [
    RendererComponent
  ]
})
export class RendererModule { }
