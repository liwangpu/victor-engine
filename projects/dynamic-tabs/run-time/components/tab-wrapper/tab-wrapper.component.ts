import { Component, OnInit, ChangeDetectionStrategy, Input, Injector, Inject, Optional, ChangeDetectorRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { CustomRenderProvider, CUSTOM_RENDER_PROVIDER, DynamicComponentMetadata, DYNAMIC_COMPONENT_METADATA, LazyService } from 'victor-core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'victor-tab-wrapper',
  templateUrl: './tab-wrapper.component.html',
  styleUrls: ['./tab-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabWrapperComponent implements OnInit {

  @Input()
  tab: DynamicComponentMetadata;
  @ViewChild('container', { static: true, read: ViewContainerRef })
  protected container: ViewContainerRef;
  @LazyService(ChangeDetectorRef)
  protected readonly cdr: ChangeDetectorRef;
  @LazyService(ComponentFactoryResolver)
  protected cfr: ComponentFactoryResolver;
  constructor(
    @Optional()
    @Inject(CUSTOM_RENDER_PROVIDER)
    protected customRenderProvider: CustomRenderProvider,
    protected injector: Injector
  ) { }

  async ngOnInit(): Promise<void> {
    const ij = Injector.create({
      providers: [
        { provide: DYNAMIC_COMPONENT_METADATA, useValue: this.tab }
      ],
      parent: this.injector
    });
    let fac = null;
    if (this.customRenderProvider) {
      fac = await this.customRenderProvider.getRenderFactory(this.tab);
    }

    fac = fac || this.cfr.resolveComponentFactory(TabComponent);

    if (fac) {
      this.container.createComponent(fac, null, ij);
    }
    this.cdr.markForCheck();
  }

}
