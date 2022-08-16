import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ComponentConfiguration } from 'victor-core';

const formDemoStorageKey: string = 'victor-form-demo-schema';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  schema: ComponentConfiguration;
  control = new FormControl();
  constructor() {
    const schemaStr = sessionStorage.getItem(formDemoStorageKey);
    if (schemaStr) {
      this.schema = JSON.parse(schemaStr);
    }
  }

  ngOnInit(): void {
  }

  onSchemaChange(val: ComponentConfiguration): void {
    this.schema = val;
    sessionStorage.setItem(formDemoStorageKey, JSON.stringify(val))
  }

}
