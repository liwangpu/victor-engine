import { Component, OnInit, ChangeDetectionStrategy, Injector, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ComponentAction, ComponentEvent, DynamicComponent, ComponentConfiguration, LazyService, PropertyEntry } from 'victor-core';


@Component({
  selector: 'app-row-layout',
  templateUrl: './row-layout.component.html',
  styleUrls: ['./row-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowLayoutComponent extends DynamicComponent {


  @PropertyEntry('configuration.body')
  rows: ComponentConfiguration[];
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  trackById(index: number, it: ComponentConfiguration): any {
    return it.id;
  }
}
