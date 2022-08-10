import { Component, OnInit, ChangeDetectionStrategy, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PageDefinition, PageStoreService } from '../../services/page-store.service';
import { filter } from 'rxjs/operators';
import { PageDetailComponent } from '../page-detail/page-detail.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-management',
  templateUrl: './page-management.component.html',
  styleUrls: ['./page-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageManagementComponent implements OnInit {

  pages: PageDefinition[];
  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private pageStore: PageStoreService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private acr: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  addPage(): void {
    const ref = this.modal.create({
      nzTitle: '新页面',
      nzContent: PageDetailComponent,
      nzClosable: false,
      nzCancelText: null,
      nzOkText: null,
      nzFooter: null,
      nzCentered: false,
      nzWrapClassName: 'page-editor-modal-wrapper',
      nzClassName: 'page-editor-modal'
    });
    ref.afterClose
      .pipe(filter(id => id ? true : false))
      .subscribe(id => {
        this.router.navigate(['/pages', 'editor', id]);
      });
  }

  editPage(id: number): void {
    this.router.navigate(['/pages', 'editor', id]);
  }

  async deletePage(id: number): Promise<void> {
    await this.pageStore.delete(id);
    this.refreshList();
  }

  private async refreshList(): Promise<void> {
    this.pages = await this.pageStore.query();
    this.cdr.markForCheck();
  }
}
