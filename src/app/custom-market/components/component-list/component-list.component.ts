import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
