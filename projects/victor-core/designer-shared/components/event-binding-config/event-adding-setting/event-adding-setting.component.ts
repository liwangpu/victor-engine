import { Component, OnInit, ChangeDetectionStrategy, Input, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ComponentInfoProvider, COMPONENT_INFO_PROVIDER, LazyService } from 'victor-core';
import { AvailabelEventBinding } from '../event-binding-config.component';

@Component({
  selector: 'victor-event-adding-setting',
  templateUrl: './event-adding-setting.component.html',
  styleUrls: ['./event-adding-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventAddingSettingComponent implements OnInit {

  form: FormGroup;
  @Input()
  availableEvents: { label: string, value: string }[];
  @LazyService(COMPONENT_INFO_PROVIDER)
  protected readonly infoProvider: ComponentInfoProvider;
  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    protected injector: Injector
  ) {
    this.form = this.fb.group({
      event: [],
      component: [],
      action: []
    });
  }

  async ngOnInit(): Promise<void> {
    const infos=await this.infoProvider.getComponentInfo();
    console.log(`infos:`,infos);
  }

  cancel(): void {
    this.modalRef.close();
  }

  save(): void {

  }

}
