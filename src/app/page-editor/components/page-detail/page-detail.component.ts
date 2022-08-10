import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { PageStoreService } from '../../services/page-store.service';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageDetailComponent implements OnInit {

  form: FormGroup;
  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private pageStore: PageStoreService
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.modalRef.close();
  }

  async save(): Promise<void> {
    if (this.form.valid) {
      const id = await this.pageStore.create(this.form.value);
      this.modalRef.close(id);
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
