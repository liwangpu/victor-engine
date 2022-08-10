import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'victor-designer-shared-config-item',
  templateUrl: './config-item.component.html',
  styleUrls: ['./config-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigItemComponent {
  @Input()
  title: string;
}
