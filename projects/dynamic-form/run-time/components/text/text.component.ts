import { Component, OnInit, ChangeDetectionStrategy, Injector, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ComponentScope, DynamicComponent, PropertyEntry } from 'victor-core';

@Component({
  selector: 'victor-dynamic-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent extends DynamicComponent implements OnInit, OnDestroy {

  control = new FormControl();
  @PropertyEntry('metadata.title')
  title: string;
  @PropertyEntry('metadata.placeholder')
  placeholder: string;
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
    // console.log('metadata:', this.metadata);
    // console.log(`scopes:`, this.scopes);
    this.subs.sink = this.control.valueChanges
      .pipe(debounceTime(120))
      .subscribe(val => {
        this.onValueChange(val);
      });
  }

  @ComponentScope()
  onValueChange(value: string): { value: string } {
    return { value };
  }

}
