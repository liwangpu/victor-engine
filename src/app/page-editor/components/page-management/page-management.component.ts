import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PageStoreService } from '../../services/page-store.service';
import { filter } from 'rxjs/operators';
import { PageDetailComponent } from '../page-detail/page-detail.component';
import { Router } from '@angular/router';
import { DynamicComponentMetadata } from 'victor-core';

@Component({
  selector: 'app-page-management',
  templateUrl: './page-management.component.html',
  styleUrls: ['./page-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageManagementComponent implements OnInit {

  pages: DynamicComponentMetadata[];
  constructor(
    private modal: NzModalService,
    private pageStore: PageStoreService,
    private cdr: ChangeDetectorRef,
    private router: Router
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

  editPage(id: string, e: MouseEvent): void {
    e.stopPropagation();
    this.router.navigate(['/pages', 'editor', id]);
    // console.log('iid:', id);
  }

  async deletePage(id: string, e: MouseEvent): Promise<void> {
    e.stopPropagation();
    await this.pageStore.delete(id);
    this.refreshList();
    const firstPage = this.pages.length ? this.pages[0] : null;
    if (firstPage) {
      this.router.navigate(['/pages', 'list', 'dynamic', firstPage.id]);
    } else {
      this.router.navigate(['/pages', 'list']);
    }
  }

  private async refreshList(): Promise<void> {
    this.pages = await this.pageStore.query();
    this.cdr.markForCheck();
  }
}
