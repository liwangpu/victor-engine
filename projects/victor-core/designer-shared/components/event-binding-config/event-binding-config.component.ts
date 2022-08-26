import { Component, OnInit, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef, Injector, Input, ViewContainerRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ComponentEventBinding, ComponentInfoProvider, COMPONENT_INFO_PROVIDER, LazyService } from 'victor-core';
import { EventAddingSettingComponent } from './event-adding-setting/event-adding-setting.component';
import * as _ from 'lodash';

export interface AvailabelEventBinding {
  key: string;
  title: string;
}

interface EventBindingGroup {
  event: string;
  eventName: string;
  bindings?: Array<EventGroupBindingItem>;
}

interface EventGroupBindingItem {
  componentId: string;
  componentTitle: string;
  actionName: string;
  index: number;
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
export class EventBindingConfigComponent implements ControlValueAccessor {

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
  @LazyService(COMPONENT_INFO_PROVIDER)
  protected readonly infoProvider: ComponentInfoProvider;
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

  async writeValue(events: ComponentEventBinding[]): Promise<void> {
    this.eventBindings = events?.length ? [...events] : [];
    await this.generateBindingGroup();
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

  addEventBinding(): void {
    const ref = this.modal.create({
      nzTitle: '添加事件',
      nzContent: EventAddingSettingComponent,
      nzClosable: false,
      nzCancelText: null,
      nzOkText: null,
      nzFooter: null,
      nzCentered: false,
      nzWidth: '640px',
      nzWrapClassName: 'page-editor-modal-wrapper',
      nzClassName: 'page-editor-modal',
      nzViewContainerRef: this.vr,
      nzComponentParams: {
        availableEvents: this.availableEvents.map(x => ({ label: x.title, value: x.key }))
      },
    });
    ref.afterClose
      .pipe(filter(evt => evt ? true : false))
      .subscribe(async evt => {
        this.eventBindings.push(evt);
        this.publishBinding();
        await this.generateBindingGroup();
        this.cdr.markForCheck();
      });
  }

  async deleteBinding(index: number): Promise<void> {
    this.eventBindings.splice(index, 1);
    await this.generateBindingGroup();
    this.publishBinding();
    this.cdr.markForCheck();
  }

  private publishBinding(): void {
    if (typeof this.onChangeFn === 'function') {
      this.onChangeFn([...this.eventBindings]);
    }
  }

  private async generateBindingGroup(): Promise<void> {
    const infos = await this.infoProvider.getComponentInfo();
    const metadatas = await this.infoProvider.getComponentMetadata();
    const componentIdTitleMap = new Map(infos.map(x => ([x.id, x.title])));
    const componentActionMap = new Map<string, { label: string, value: string }[]>();
    infos.forEach(io => {
      const md = metadatas[io.type];
      if (md?.actions?.length) {
        componentActionMap.set(io.id, md.actions.map(x => ({ label: x.name, value: x.key })));
      }
    });
    this.groups = [];
    const eventKeys = _.uniq(this.eventBindings.map(e => e.event));
    for (let ek of eventKeys) {
      const g: EventBindingGroup = { event: ek, eventName: this.availableEvents.find(e => e.key === ek).title };
      const bindings: EventGroupBindingItem[] = [];
      for (let i = 0; i < this.eventBindings.length; i++) {
        const b = this.eventBindings[i];
        const actions = componentActionMap.get(b.component);
        bindings.push({
          componentId: b.component,
          componentTitle: componentIdTitleMap.get(b.component) || '已删除',
          actionName: actions.find(a => a.value === b.action)?.label || '无',
          index: i
        });
      }

      if (bindings.length) {
        g.bindings = bindings;
        this.groups.push(g);
      }
    }
  }

}
