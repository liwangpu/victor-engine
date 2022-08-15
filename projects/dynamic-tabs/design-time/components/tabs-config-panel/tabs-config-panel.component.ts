import { Component, OnInit, ChangeDetectionStrategy, Injector, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComponentDesignPanel, LazyService } from 'victor-core';
import { SubSink } from 'subsink';

@Component({
  selector: 'victor-dynamic-tabs-config-panel',
  templateUrl: './tabs-config-panel.component.html',
  styleUrls: ['./tabs-config-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsConfigPanelComponent extends ComponentDesignPanel implements OnInit, OnDestroy {


  form: FormGroup;
  @LazyService(FormBuilder)
  protected fb: FormBuilder;
  private subs = new SubSink();
  constructor(
    injector: Injector
  ) {
    super(injector);
    this.form = this.fb.group({
      title: [],
      body: []
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
