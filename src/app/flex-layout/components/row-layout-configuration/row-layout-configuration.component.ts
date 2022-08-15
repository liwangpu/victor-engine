import { Component, OnInit, ChangeDetectionStrategy, Injector, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComponentDesignPanel, LazyService } from 'victor-core';
import { SubSink } from 'subsink';
import * as shortid from 'shortid';
import * as _ from 'lodash';

interface FormValue {
  rows: number;
}

@Component({
  selector: 'app-row-layout-configuration',
  templateUrl: './row-layout-configuration.component.html',
  styleUrls: ['./row-layout-configuration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowLayoutConfigurationComponent extends ComponentDesignPanel implements OnInit, OnDestroy {


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
      rows: [1]
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    // console.log(`cfg:`, this.configuration);
    let body = this.configuration.body?.length ? [...this.configuration.body] : [];
    this.form.patchValue({ rows: this.configuration.body?.length || 1 });
    this.form.patchValue(this.configuration, { emitEvent: false });
    this.subs.sink = this.form.valueChanges
      .subscribe((val: FormValue) => {
        if (body.length > val.rows) {
          body = body.slice(0, val.rows);
        } else {
          for (let idx = val.rows - body.length; idx > 0; idx--) {
            body.push({
              id: `${shortid.generate()}`,
              type: 'row-layout-container',
              body: []
            });
          }
        }

        const cfg = { ...val, body: _.cloneDeep(body) };
        delete cfg.rows;
        this.onChangeFn(cfg);
      });
  }

}