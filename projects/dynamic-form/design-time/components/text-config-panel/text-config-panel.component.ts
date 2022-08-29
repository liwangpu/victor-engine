import { Component, OnInit, ChangeDetectionStrategy, Injector, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubSink } from 'subsink';
import { ComponentDesignPanel, LazyService } from 'victor-core';

@Component({
  selector: 'victor-dynamic-text-config-panel',
  templateUrl: './text-config-panel.component.html',
  styleUrls: ['./text-config-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextConfigPanelComponent extends ComponentDesignPanel implements OnInit, OnDestroy {

  form: FormGroup;
  @LazyService(FormBuilder)
  protected fb: FormBuilder;
  private subs = new SubSink();
  constructor(
    injector: Injector
  ) {
    super(injector);
    this.form = this.fb.group({
      key: [],
      title: [],
      placeholder: [],
      validators: []
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.form.patchValue(this.configuration, { emitEvent: false });
    this.subs.sink = this.form.valueChanges
      .subscribe(val => {
        this.onChangeFn(val);
      });
  }

}
