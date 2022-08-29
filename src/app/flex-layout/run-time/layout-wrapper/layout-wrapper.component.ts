import { Component, OnInit, ChangeDetectionStrategy, Input, Injector, Inject, Optional, ChangeDetectorRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { CustomRenderProvider, CUSTOM_RENDER_PROVIDER, ComponentConfiguration, COMPONENT_CONFIGURATION, LazyService } from 'victor-core';
import { RowLayoutContainerComponent } from '../row-layout-container/row-layout-container.component';

@Component({
  selector: 'app-layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutWrapperComponent implements OnInit {

  @Input()
  row: ComponentConfiguration;
  @ViewChild('container', { static: true, read: ViewContainerRef })
  protected container: ViewContainerRef;
  @LazyService(ChangeDetectorRef)
  protected readonly cdr: ChangeDetectorRef;
  constructor(
    @Optional()
    @Inject(CUSTOM_RENDER_PROVIDER)
    protected customRenderProvider: CustomRenderProvider,
    protected injector: Injector
  ) { }

  async ngOnInit(): Promise<void> {
    const ij = Injector.create({
      providers: [
        { provide: COMPONENT_CONFIGURATION, useValue: this.row }
      ],
      parent: this.injector
    });
    let componentType = null;
    if (this.customRenderProvider) {
      componentType = await this.customRenderProvider.getRenderComponent(this.row);
    }

    componentType = componentType || RowLayoutContainerComponent;

    this.container.createComponent(componentType, {
      injector: ij
    });
    this.cdr.markForCheck();
  }

}
