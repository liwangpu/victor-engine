import { Component, OnInit, ChangeDetectionStrategy, Injector } from '@angular/core';
import { DynamicComponent } from 'victor-core';

@Component({
  selector: 'victor-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent extends DynamicComponent implements OnInit {

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
