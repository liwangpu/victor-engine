import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropContainerComponent } from './components/drop-container/drop-container.component';
import { OptionalComponentsDirective } from './directives/optional-components.directive';
import { ComponentDesignWrapperComponent } from './components/component-design-wrapper/component-design-wrapper.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    DropContainerComponent,
    OptionalComponentsDirective,
    ComponentDesignWrapperComponent,
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
