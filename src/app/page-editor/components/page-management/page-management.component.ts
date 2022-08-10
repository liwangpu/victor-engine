import { Component, OnInit, ChangeDetectionStrategy, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PageEditorComponent } from '../page-editor/page-editor.component';

@Component({
  selector: 'app-page-management',
  templateUrl: './page-management.component.html',
  styleUrls: ['./page-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageManagementComponent implements OnInit {

  constructor(
    private modal: NzModalService, private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
  }

  addPage(): void {
    this.modal.create({
      nzTitle: '新页面',
      nzContent: PageEditorComponent,
      nzClosable: false,
      nzCancelText: null,
      nzOkText: null,
      nzFooter: null,
      nzWrapClassName: 'page-editor-modal-wrapper',
      nzClassName: 'page-editor-modal',
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
    });
  }

}
