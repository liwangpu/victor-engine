import { Component, OnInit, ChangeDetectionStrategy, Input, ViewContainerRef, ViewChild, Injector, ComponentFactoryResolver } from '@angular/core';
import { ComponentConfiguration, COMPONENT_CONFIGURATION, LazyService } from 'victor-core';
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
  @LazyService(ComponentFactoryResolver)
  private readonly cdr: ComponentFactoryResolver;
  constructor(
    protected injector: Injector
  ) {
  }

  async ngOnInit(): Promise<void> {
    const fac = this.cdr.resolveComponentFactory(ComponentDesignWrapperComponent);
    const ij = Injector.create({
      providers: [
        { provide: COMPONENT_CONFIGURATION, useValue: this.configuration },
      ],
      parent: this.injector
    });
    const ref = this.container.createComponent(fac, null, ij);
  }

}
