import { Component, OnInit, ChangeDetectionStrategy, Injector } from '@angular/core';
import { DynamicComponent } from 'victor-core';

@Component({
  selector: 'victor-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextButtonComponent extends DynamicComponent implements OnInit {

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

}