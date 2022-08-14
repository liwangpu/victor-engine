import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicComponentMetadata } from 'victor-core';

const formDemoStorageKey: string = 'victor-form-demo-schema';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  schema: DynamicComponentMetadata;
  control = new FormControl();
  constructor() {
    const schemaStr = sessionStorage.getItem(formDemoStorageKey);
    if (schemaStr) {
      this.schema = JSON.parse(schemaStr);
    }
  }

  ngOnInit(): void {
  }

  onSchemaChange(val: DynamicComponentMetadata): void {
    this.schema = val;
    sessionStorage.setItem(formDemoStorageKey, JSON.stringify(val))
  }

}
