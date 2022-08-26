import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubSink } from 'subsink';
import { ComponentDesignPanel, LazyService } from 'victor-core';


@Component({
  selector: 'app-vedio-player-configuration',
  templateUrl: './vedio-player-configuration.component.html',
  styleUrls: ['./vedio-player-configuration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VedioPlayerConfigurationComponent extends ComponentDesignPanel implements OnInit, OnDestroy {

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
      vedioUrl: [],
      autoplay: [],
      showControl: [],
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
