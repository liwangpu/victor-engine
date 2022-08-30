import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { Subscription } from 'rxjs';
import { CustomComponentStoreService } from '../../services/custom-component-store.service';

@Component({
  selector: 'app-component-edit',
  templateUrl: './component-edit.component.html',
  styleUrls: ['./component-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentEditComponent implements OnInit {

  form: FormGroup;
  uploading = false;
  fileList: NzUploadFile[] = [];
  fileUploadRequest: (item: NzUploadXHRArgs) => Subscription = item => this.fileUpload(item);
  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return true;
  };
  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private componentStore: CustomComponentStoreService
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.modalRef.close();
  }

  async save(): Promise<void> {
    if (this.form.valid) {
      const id = await this.componentStore.create(this.form.value);
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

  fileUpload(item: NzUploadXHRArgs): Subscription {
    // console.log(1, item);
    // console.log(1, this.form.errors);

    const formValue: any = this.form.value;
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    formData.append('version', formValue.version);
    formData.append('componentId', formValue.componentId);

    const req = new HttpRequest('POST', `http://localhost:3000/custom-component/upload`, formData, {
      reportProgress: true,
      withCredentials: false
    });

    return this.http
      .request(req)
      .subscribe((event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total > 0) {
            (event as any).percent = event.loaded / event.total * 100; // tslint:disable-next-line:no-any
          }
          // To process the upload progress bar, you must specify the `percent` attribute to indicate progress.
          item.onProgress(event, item.file);
        } else if (event instanceof HttpResponse) { /* success */
          item.onSuccess(event.body, item.file, event);
          this.form.patchValue({ uploaded: true });
          this.cdr.markForCheck();
        }
      }, err => {
        item.onError(err, item.file);
        this.cdr.markForCheck();
      });
  }


}
