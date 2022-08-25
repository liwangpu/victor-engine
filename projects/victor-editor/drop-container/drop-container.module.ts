import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropContainerComponent } from './components/drop-container/drop-container.component';
import { OptionalComponentsDirective } from './directives/optional-components.directive';
import { ComponentDesignWrapperComponent } from './components/component-design-wrapper/component-design-wrapper.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { DropItemWrapperComponent } from './components/drop-item-wrapper/drop-item-wrapper.component';

@NgModule({
  declarations: [
    DropContainerComponent,
    OptionalComponentsDirective,
    ComponentDesignWrapperComponent,
    DropItemWrapperComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [
    DropContainerComponent,
    OptionalComponentsDirective
  ]
})
export class DropContainerModule { }
