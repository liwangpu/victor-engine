import { Component, OnInit, ChangeDetectionStrategy, Injector, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubSink } from 'subsink';
import { ComponentDesignPanel, LazyService } from 'victor-core';
import { AvailabelEventBinding } from 'victor-editor-shared/common';

@Component({
  selector: 'victor-normal-button-configuration',
  templateUrl: './normal-button-configuration.component.html',
  styleUrls: ['./normal-button-configuration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NormalButtonConfigurationComponent extends ComponentDesignPanel implements OnInit, OnDestroy {

  form: FormGroup;
  availableEvents: AvailabelEventBinding[];
  @LazyService(FormBuilder)
  protected fb: FormBuilder;
  private subs = new SubSink();
  constructor(
    injector: Injector
  ) {
    super(injector);
    this.form = this.fb.group({
      title: [],
      eventBindings: []
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.availableEvents = [
      { key: 'onclick', title: '点击' }
    ];
    this.form.patchValue(this.configuration, { emitEvent: false });
    this.subs.sink = this.form.valueChanges
      .subscribe(val => {
        this.onChangeFn(val);
      });
  }

}
