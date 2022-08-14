import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Injector, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SubSink } from 'subsink';
import { ComponentValidatorRule, LazyService } from 'victor-core';

interface FormValue {
  required?: boolean;
  textLength?: boolean;
  textLengthMin?: number;
  textLengthMax?: number;
}

@Component({
  selector: 'victor-dynamic-text-validator',
  templateUrl: './text-validator.component.html',
  styleUrls: ['./text-validator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextValidatorComponent),
      multi: true
    }
  ]
})
export class TextValidatorComponent implements ControlValueAccessor, OnInit, OnDestroy {

  disabled: boolean;
  form: FormGroup;
  @LazyService(FormBuilder)
  protected fb: FormBuilder;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  private onChangeFn: (val: any) => any;
  private onTouchedFn: () => any;
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) {
    this.form = this.fb.group({
      required: [],
      textLength: [],
      textLengthMin: [],
      textLengthMax: [],
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = this.form.valueChanges
      .subscribe((val: FormValue) => {
        if (typeof this.onChangeFn !== 'function') { return; }
        this.onChangeFn(TextValidatorComponent.transferValidatorRules(val));
      });
  }

  writeValue(obj: ComponentValidatorRule[]): void {
    obj = obj || [];
    const formValue: FormValue = {};
    formValue.required = obj.some(x => x.type === 'required');

    const textLengthRule = obj.find(x => x.type === 'text-length');
    if (textLengthRule) {
      formValue.textLength = textLengthRule.min || textLengthRule.max;
      formValue.textLengthMin = textLengthRule.min;
      formValue.textLengthMax = textLengthRule.max;
    } else {
      formValue.textLength = false;
    }


    this.form.patchValue(formValue, { emitEvent: false });
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

  private static transferValidatorRules(val: FormValue): ComponentValidatorRule[] {
    const rules: ComponentValidatorRule[] = [];
    if (val.required) {
      rules.push({
        type: 'required'
      });
    }

    if (val.textLength) {
      const rule: ComponentValidatorRule = { type: 'text-length' };
      if (val.textLengthMin) {
        rule.min = val.textLengthMin;
      }

      if (val.textLengthMax) {
        rule.max = val.textLengthMax;
      }
      rules.push(rule);
    }
    console.log(`rules:`, rules);
    return rules;
  }

}
