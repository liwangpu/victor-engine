import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-victor-renderer',
  template: `
    <p>
      victor-renderer works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VictorRendererComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
