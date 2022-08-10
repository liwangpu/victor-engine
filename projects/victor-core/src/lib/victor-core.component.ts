import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-victor-core',
  template: `
    <p>
      victor-core works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VictorCoreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
