import { Component, OnInit, ChangeDetectionStrategy, Injector, OnDestroy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ComponentScope, DynamicComponent, IHasValidator, LazyService, PropertyEntry } from 'victor-core';

@Component({
  selector: 'victor-normal-button',
  templateUrl: './normal-button.component.html',
  styleUrls: ['./normal-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NormalButtonComponent extends DynamicComponent implements OnInit {

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
