import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-victor-editor',
  template: `
    <p>
      victor-editor works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VictorEditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
