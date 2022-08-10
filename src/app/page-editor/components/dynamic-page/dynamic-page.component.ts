import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
