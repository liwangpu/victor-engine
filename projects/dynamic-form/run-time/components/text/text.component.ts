import { Component, OnInit, ChangeDetectionStrategy, Injector, OnDestroy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ComponentScope, DynamicComponent, IHasValidator, LazyService, PropertyEntry } from 'victor-core';

@Component({
  selector: 'victor-dynamic-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent extends DynamicComponent implements IHasValidator, OnInit, OnDestroy {

  @HostBinding('class.error')
  hasError: boolean;
  errorMessages: string[];
  control = new FormControl();
  @PropertyEntry('metadata.title')
  title: string;
  @PropertyEntry('metadata.placeholder')
  placeholder: string;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  private readonly subs = new SubSink();
  constructor(
    injector: Injector
  ) {
    super(injector);
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = this.control.valueChanges
      .pipe(debounceTime(120))
      .subscribe(val => {
        this.onValueChange(val);
      });
  }

  clearValue(): void {
    this.control.patchValue(null);
  }

  @ComponentScope()
  onValueChange(value: string): { value: string } {
    return { value };
  }

  async onValidatedChange(errors: { [scopeName: string]: string; }): Promise<void> {
    this.errorMessages = [];
    if (errors) {
      const keys = Object.keys(errors);
      keys.forEach(k => {
        this.errorMessages.push(errors[k]);
      });
    }
    this.hasError = this.errorMessages.length > 0;
    this.cdr.markForCheck();
  }

}
