import { Component, ChangeDetectionStrategy, forwardRef, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicComponentMetadata } from 'victor-core';
import { RendererStarter, RENDERER_STARTER } from 'victor-renderer/renderer';

@Component({
  selector: 'victor-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: RENDERER_STARTER, useExisting: forwardRef(() => FormComponent) },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FormComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => FormComponent), multi: true }
  ]
})
export class FormComponent implements RendererStarter, Validator, ControlValueAccessor, OnChanges {

  disabled: boolean;
  @Input()
  schema: DynamicComponentMetadata;
  private readonly _schema$ = new BehaviorSubject<DynamicComponentMetadata>(null);
  private onValidatorChangeFn: () => void;
  private onChangeFn: (val: any) => any;
  private onTouchedFn: () => any;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const schemaChange: SimpleChange = changes['schema'];
    if (schemaChange) {
      this._schema$.next(schemaChange.currentValue);
    }
  }

  getSchema(): Observable<DynamicComponentMetadata> {
    return this._schema$;
  }

  validate(control: AbstractControl): ValidationErrors {
    console.log(`trigger:`,);
    return null;
  }

  writeValue(obj: DynamicComponentMetadata): void {

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

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChangeFn = fn;
  }

}
