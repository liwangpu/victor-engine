import { Component, OnInit, ChangeDetectionStrategy, Input, Injector, Inject, Optional, ChangeDetectorRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { CustomRenderProvider, CUSTOM_RENDER_PROVIDER, DynamicComponentMetadata, DYNAMIC_COMPONENT_METADATA, LazyService } from 'victor-core';
import { RowLayoutContainerComponent } from '../row-layout-container/row-layout-container.component';

@Component({
  selector: 'app-layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutWrapperComponent implements OnInit {

  @Input()
  row: DynamicComponentMetadata;
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
        { provide: DYNAMIC_COMPONENT_METADATA, useValue: this.row }
      ],
      parent: this.injector
    });
    let fac = null;
    if (this.customRenderProvider) {
      fac = await this.customRenderProvider.getRenderFactory(this.row);
    }

    fac = fac || this.cfr.resolveComponentFactory(RowLayoutContainerComponent);

    if (fac) {
      this.container.createComponent(fac, null, ij);
    }
    this.cdr.markForCheck();
  }

}
