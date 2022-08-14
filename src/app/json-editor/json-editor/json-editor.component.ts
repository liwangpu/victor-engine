import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
import { SubSink } from 'subsink';
import JSONEditor from 'jsoneditor';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JsonEditorComponent),
      multi: true
    }
  ]
})
export class JsonEditorComponent implements OnInit {

  value: any;
  private editor: any;
  private onChangeFn: (val: any) => any;
  private subs: SubSink = new SubSink();
  public constructor(
    private cf: ChangeDetectorRef,
    private el: ElementRef
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    const options = {
      mode: 'code',
      statusBar: false,
      mainMenuBar: true,
      onChange: () => {
        this.onChangeFn(this.editor.get());
      }
    };
    this.editor = new JSONEditor(this.el.nativeElement, options);
  }

  writeValue(obj: any): void {
    if (!obj) { return; }
    this.editor.set(obj)
    this.cf.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    //
  }

  setDisabledState?(isDisabled: boolean): void {
    //
  }

}
