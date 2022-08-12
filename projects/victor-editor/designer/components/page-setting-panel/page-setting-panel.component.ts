import { Component, OnInit, ChangeDetectionStrategy, Injector, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubSink } from 'subsink';
import { ComponentDesignPanel, LazyService } from 'victor-core';
import { DropContainerOpsatService } from 'victor-editor/drop-container';

@Component({
  selector: 'victor-page-setting-panel',
  templateUrl: './page-setting-panel.component.html',
  styleUrls: ['./page-setting-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageSettingPanelComponent extends ComponentDesignPanel implements OnInit {

  form: FormGroup;
  @LazyService(FormBuilder)
  protected fb: FormBuilder;
  private subs = new SubSink();
  constructor(
    injector: Injector
  ) {
    super(injector);
    this.form = this.fb.group({
      title: []
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
