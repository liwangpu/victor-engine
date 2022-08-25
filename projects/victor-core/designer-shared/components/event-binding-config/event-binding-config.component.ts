import { Component, OnInit, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef, Injector, Input, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { LazyService } from 'victor-core';
import { EventAddingSettingComponent } from './event-adding-setting/event-adding-setting.component';

export interface AvailabelEventBinding {
  key: string;
  title: string;
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
export class EventBindingConfigComponent implements ControlValueAccessor, OnInit {

  disabled: boolean;
  form: FormGroup;
  @Input()
  availableEvents: AvailabelEventBinding[];
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
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) { }


  ngOnInit(): void {
  }

  writeValue(obj: any): void {

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
      .pipe(filter(id => id ? true : false))
      .subscribe(id => {

      });
  }

}
