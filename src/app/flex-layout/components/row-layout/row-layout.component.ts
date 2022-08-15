import { Component, OnInit, ChangeDetectionStrategy, Injector, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ComponentAction, ComponentEvent, DynamicComponent, DynamicComponentMetadata, LazyService, PropertyEntry } from 'victor-core';


@Component({
  selector: 'app-row-layout',
  templateUrl: './row-layout.component.html',
  styleUrls: ['./row-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowLayoutComponent extends DynamicComponent {


  @PropertyEntry('metadata.body')
  rows: DynamicComponentMetadata[];
  constructor(
    injector: Injector
  ) {
    super(injector);
    // console.log(`rows:`,this.rows);
  }

  trackById(index: number, it: DynamicComponentMetadata): any {
    return it.id;
  }
}
