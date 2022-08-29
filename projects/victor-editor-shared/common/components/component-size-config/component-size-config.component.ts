import { Component, OnInit, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef, Injector, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { LazyService } from 'victor-core';

@Component({
  selector: 'victor-component-size-config',
  templateUrl: './component-size-config.component.html',
  styleUrls: ['./component-size-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComponentSizeConfigComponent),
      multi: true
    }
  ]
})
export class ComponentSizeConfigComponent implements ControlValueAccessor, OnInit, OnDestroy {

  disabled: boolean;
  form: FormGroup;
  @LazyService(FormBuilder)
  protected readonly fb: FormBuilder;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  private onChangeFn: (val: any) => any;
  private onTouchedFn: () => any;
  private readonly subs = new SubSink();
  constructor(
    protected injector: Injector
  ) {
    this.form = this.fb.group({
      width: [],
      height: []
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = this.form.valueChanges
      .pipe(debounceTime(120))
      .subscribe(val => {
        if (typeof this.onChangeFn === 'function') {
          this.onChangeFn(val);
        }
      });
  }

  writeValue(obj: any): void {
    if (!obj) { return; }
    this.form.patchValue(obj);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
