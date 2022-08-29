import { Component, OnInit, ChangeDetectionStrategy, Input, ViewContainerRef, ViewChild, Injector } from '@angular/core';
import { ComponentConfiguration, COMPONENT_CONFIGURATION } from 'victor-core';
import { ComponentDesignWrapperComponent } from '../component-design-wrapper/component-design-wrapper.component';

@Component({
  selector: 'victor-drop-item-wrapper',
  templateUrl: './drop-item-wrapper.component.html',
  styleUrls: ['./drop-item-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropItemWrapperComponent implements OnInit {

  @Input()
  configuration: ComponentConfiguration;
  @ViewChild('container', { static: true, read: ViewContainerRef })
  readonly container: ViewContainerRef;
  constructor(
    protected injector: Injector
  ) {
  }

  async ngOnInit(): Promise<void> {
    const ij = Injector.create({
      providers: [
        { provide: COMPONENT_CONFIGURATION, useValue: this.configuration },
      ],
      parent: this.injector
    });
    const ref = this.container.createComponent(ComponentDesignWrapperComponent, {
      injector: ij
    });
  }

}
