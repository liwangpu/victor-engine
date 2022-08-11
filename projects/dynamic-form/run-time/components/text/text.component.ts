import { Component, OnInit, ChangeDetectionStrategy, Injector } from '@angular/core';
import { DynamicComponent, PropertyEntry } from 'victor-core';

@Component({
  selector: 'victor-dynamic-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent extends DynamicComponent implements OnInit {

  @PropertyEntry('metadata.title')
  title: string;
  @PropertyEntry('metadata.placeholder')
  placeholder: string;
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    // console.log('text:', this.metadata);
    // console.log('title:', this.placeholder);
  }

}
