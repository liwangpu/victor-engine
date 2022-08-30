import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-component-edit',
  templateUrl: './component-edit.component.html',
  styleUrls: ['./component-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentEditComponent implements OnInit {

  form: FormGroup;
  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
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
    this.modalRef.close(true);
  }

}
