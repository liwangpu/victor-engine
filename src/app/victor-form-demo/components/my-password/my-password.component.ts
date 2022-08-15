import { Component, OnInit, ChangeDetectionStrategy, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicComponent, PropertyEntry } from 'victor-core';

@Component({
  selector: 'app-my-password',
  templateUrl: './my-password.component.html',
  styleUrls: ['./my-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyPasswordComponent extends DynamicComponent implements OnInit {

  control = new FormControl();
  @PropertyEntry('metadata.placeholder')
  placeholder: string;
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

  clearValue(): void {
    this.control.patchValue(null);
  }

}
