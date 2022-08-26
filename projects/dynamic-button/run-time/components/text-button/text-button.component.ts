import { Component, ChangeDetectionStrategy, Injector, EventEmitter } from '@angular/core';
import { ComponentEvent, DynamicComponent } from 'victor-core';

@Component({
  selector: 'victor-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextButtonComponent extends DynamicComponent {

  @ComponentEvent()
  onclick = new EventEmitter<void>();
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  onClick(evt: MouseEvent): void {
    evt.stopPropagation();
    this.onclick.next();
  }
}