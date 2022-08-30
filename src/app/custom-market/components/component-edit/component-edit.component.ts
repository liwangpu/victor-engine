import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-component-edit',
  templateUrl: './component-edit.component.html',
  styleUrls: ['./component-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
