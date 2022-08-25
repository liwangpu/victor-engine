import { Component, OnInit, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef, Injector, Input, ViewContainerRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ComponentEventBinding, LazyService } from 'victor-core';
import { EventAddingSettingComponent } from './event-adding-setting/event-adding-setting.component';

export interface AvailabelEventBinding {
  key: string;
  title: string;
}

interface EventBindingGroup {
  eventName: string;
  bindings: Array<{ componentId: string; componentTitle: string; actionName: string }>;
}

@Component({
  selector: 'victor-event-binding-config',
  templateUrl: './event-binding-config.component.html',
  styleUrls: ['./event-binding-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EventBindingConfigComponent),
      multi: true
    }
  ]
})
export class EventBindingConfigComponent implements ControlValueAccessor, OnInit, OnDestroy {

  disabled: boolean;
  form: FormGroup;
  @Input()
  availableEvents: AvailabelEventBinding[];
  groups: EventBindingGroup[] = [];
  protected eventBindings: ComponentEventBinding[];
  @LazyService(FormBuilder)
  protected readonly fb: FormBuilder;
  @LazyService(NzModalService)
  protected readonly modal: NzModalService;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(ViewContainerRef)
  private readonly vr: ViewContainerRef;
  private onChangeFn: (val: any) => any;
  private onTouchedFn: () => any;
  private readonly subs = new SubSink();
  constructor(
    protected injector: Injector
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  ngOnInit(): void {
  }

  writeValue(events: ComponentEventBinding[]): void {
    this.eventBindings = events?.length ? [...events] : [];
    console.log(`events:`, events);
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

  addEventBinding(): void {
    const ref = this.modal.create({
      nzTitle: '添加事件',
      nzContent: EventAddingSettingComponent,
      nzClosable: false,
      nzCancelText: null,
      nzOkText: null,
      nzFooter: null,
      nzCentered: false,
      nzWrapClassName: 'page-editor-modal-wrapper',
      nzClassName: 'page-editor-modal',
      nzViewContainerRef: this.vr,
      nzComponentParams: {
        availableEvents: this.availableEvents.map(x => ({ label: x.title, value: x.key }))
      },
    });
    ref.afterClose
      .pipe(filter(evt => evt ? true : false))
      .subscribe(evt => {
        this.eventBindings.push(evt);
        this.publishBinding();
      });
  }

  private publishBinding(): void {
    if (typeof this.onChangeFn === 'function') {
      this.onChangeFn([...this.eventBindings]);
    }
  }

}
