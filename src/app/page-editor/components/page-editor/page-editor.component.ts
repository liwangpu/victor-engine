import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageEditorComponent implements OnInit {

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
