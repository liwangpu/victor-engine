import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs';
import { SubSink } from 'subsink';
import { CustomComponentDescription, CustomComponentStoreService } from '../../services/custom-component-store.service';
import { ComponentEditComponent } from '../component-edit/component-edit.component';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentListComponent implements OnInit, OnDestroy {

  components: CustomComponentDescription[];
  private subs = new SubSink();
  constructor(
    private modal: NzModalService,
    private cdr: ChangeDetectorRef,
    private componentStore: CustomComponentStoreService
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    await this.refreshComponents();
    this.cdr.markForCheck();
  }

  async addComponent(): Promise<void> {
    const ref = this.modal.create({
      nzTitle: '上传新组建',
      nzContent: ComponentEditComponent,
      nzClosable: false,
      nzCancelText: null,
      nzOkText: null,
      nzFooter: null,
      nzCentered: false,
      nzWidth: 800,
      nzWrapClassName: 'page-editor-modal-wrapper',
      nzClassName: 'page-editor-modal'
    });
    ref.afterClose
      .pipe(filter(id => id ? true : false))
      .subscribe(async id => {
        await this.refreshComponents();
        this.cdr.markForCheck();
      });
  }

  async deleteComponent(component: CustomComponentDescription): Promise<void> {
    await this.componentStore.delete(component.id);
    await this.refreshComponents();
    this.cdr.markForCheck();
  }

  private async refreshComponents(): Promise<void> {
    this.components = await this.componentStore.query();
  }

}
