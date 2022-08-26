import { Component, OnInit, ChangeDetectionStrategy, Input, Injector, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { SubSink } from 'subsink';
import { ComponentInfoProvider, COMPONENT_INFO_PROVIDER, LazyService } from 'victor-core';

@Component({
  selector: 'victor-event-adding-setting',
  templateUrl: './event-adding-setting.component.html',
  styleUrls: ['./event-adding-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventAddingSettingComponent implements OnInit, OnDestroy {

  form: FormGroup;
  @Input()
  availableEvents: { label: string, value: string }[] = [];
  components: { label: string, value: string }[] = [];
  componentActions: { label: string, value: string }[] = [];
  @LazyService(COMPONENT_INFO_PROVIDER)
  protected readonly infoProvider: ComponentInfoProvider;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  private readonly componentActionMap = new Map<string, { label: string, value: string }[]>();
  private readonly subs = new SubSink();
  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    protected injector: Injector
  ) {
    this.form = this.fb.group({
      event: [],
      component: [],
      action: [],
      params: []
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  async ngOnInit(): Promise<void> {
    const infos = await this.infoProvider.getComponentInfo();
    const metadatas = await this.infoProvider.getComponentMetadata();
    this.components = [];
    infos.forEach(io => {
      const md = metadatas[io.type];
      if (md?.actions?.length) {
        this.componentActionMap.set(io.id, md.actions.map(x => ({ label: x.name, value: x.key })));
        this.components.push({ label: io.title, value: io.id });
      }
    });

    this.subs.sink = this.form.controls['component'].valueChanges
      .subscribe(cid => {
        this.form.patchValue({ action: null });
        this.componentActions = this.componentActionMap.get(cid) || [];
        this.cdr.markForCheck();
      });

    this.cdr.markForCheck();
  }

  cancel(): void {
    this.modalRef.close();
  }

  save(): void {
    this.modalRef.close(this.form.value);
  }

}
