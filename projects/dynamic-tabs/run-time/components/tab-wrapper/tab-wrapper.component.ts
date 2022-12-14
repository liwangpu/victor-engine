import { Component, OnInit, ChangeDetectionStrategy, Input, Injector, Inject, Optional, ChangeDetectorRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { CustomRenderProvider, CUSTOM_RENDER_PROVIDER, ComponentConfiguration, COMPONENT_CONFIGURATION, LazyService } from 'victor-core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'victor-tab-wrapper',
  templateUrl: './tab-wrapper.component.html',
  styleUrls: ['./tab-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabWrapperComponent implements OnInit {

  @Input()
  tab: ComponentConfiguration;
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
        { provide: COMPONENT_CONFIGURATION, useValue: this.tab }
      ],
      parent: this.injector
    });
    let componentType = null;
    if (this.customRenderProvider) {
      componentType = await this.customRenderProvider.getRenderComponent(this.tab);
    }

    componentType = componentType || TabComponent;

    this.container.createComponent(componentType, {
      injector: ij
    });
    this.cdr.markForCheck();
  }

}
