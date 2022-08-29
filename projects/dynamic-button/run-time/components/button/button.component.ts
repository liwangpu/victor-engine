import { Component, ChangeDetectionStrategy, Injector, EventEmitter } from '@angular/core';
import { ComponentEvent, DynamicComponent } from 'victor-core';

@Component({
  selector: 'victor-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends DynamicComponent {

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
