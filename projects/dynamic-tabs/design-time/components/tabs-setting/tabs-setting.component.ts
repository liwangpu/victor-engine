import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Injector, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentIdGenerator, COMPONENT_ID_GENERATOR, LazyService, COMPONENT_DESIGN_CONFIGURATION, ComponentDesignConfiguration, INTERACTION_EVENT_OBSERVER, INTERACTION_ACTION_EXECUTOR } from 'victor-core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SubSink } from 'subsink';

interface TabSetting {
  id: string;
  type: string;
  title: string;
}

interface FormValue {
  tabs: TabSetting[]
}

@Component({
  selector: 'victor-tabs-setting',
  templateUrl: './tabs-setting.component.html',
  styleUrls: ['./tabs-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TabsSettingComponent),
      multi: true
    }
  ]
})
export class TabsSettingComponent implements ControlValueAccessor, OnInit {

  disabled: boolean;
  form: FormGroup;
  activedTabId?: string;
  private controlAdding: boolean;
  @LazyService(COMPONENT_DESIGN_CONFIGURATION)
  public readonly configuration: ComponentDesignConfiguration;
  @LazyService(INTERACTION_EVENT_OBSERVER, null)
  private readonly eventObserver: Observable<{ eventName: string, data?: any }>;
  @LazyService(INTERACTION_ACTION_EXECUTOR, null)
  private readonly actionExecutor: (actionName: string, data?: any) => void;
  @LazyService(FormBuilder)
  private readonly fb: FormBuilder;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(COMPONENT_ID_GENERATOR)
  private readonly idGenerator: ComponentIdGenerator;
  private onChangeFn: (val: any) => any;
  private onTouchedFn: () => any;
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) {
    this.form = this.fb.group({
      tabs: this.fb.array([])
    });
  }

  get tabs(): FormArray {
    return this.form.controls['tabs'] as any;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    // console.log('interactionOpsat:', this.interactionOpsat);
    this.subs.sink = this.form.valueChanges
      .pipe(filter(() => !this.controlAdding))
      .subscribe((val: FormValue) => {
        // console.log('vvv:', val);
        if (typeof this.onChangeFn === 'function') {
          this.onChangeFn(val.tabs);
        }
      });

    if (this.eventObserver) {
      this.eventObserver
        .pipe(filter(e => e.eventName === 'tabChange'))
        .pipe(map(e => e.data))
        .subscribe(tabId => {
          this.activedTabId = tabId;
          this.cdr.markForCheck();
        });
    }
  }

  writeValue(obj: TabSetting[] = []): void {
    obj?.forEach(it => this.addTab(it, false));
    this.activedTabId = obj?.length ? obj[0].id : null;
    this.cdr.markForCheck();
  }

  async addTab(item: TabSetting = null, emitEvent: boolean = true): Promise<void> {
    if (!emitEvent) {
      this.controlAdding = true;
    }
    const f: FormGroup = this.fb.group(item || {
      id: await this.idGenerator.generate('tab'),
      type: 'tab',
      title: `页签 ${this.tabs.length + 1}`
    });
    this.tabs.push(f);
    if (!emitEvent) {
      this.controlAdding = false;
    }
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

  activeTab(tabId: string) {
    this.activedTabId = tabId;
    if (this.actionExecutor) {
      this.actionExecutor('activeTab', tabId);
    }
  }

}
