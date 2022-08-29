import { Component, OnInit, ChangeDetectionStrategy, Injector, ViewChild, ViewContainerRef, ChangeDetectorRef, Type } from '@angular/core';
import { COMPONENT_CONFIGURATION, CustomRenderProvider, CUSTOM_RENDER_PROVIDER, DynamicComponent, LazyService } from 'victor-core';
import { PageContentComponent } from '../page-content/page-content.component';

@Component({
  selector: 'victor-dynamic-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent extends DynamicComponent {

  @ViewChild('container', { static: true, read: ViewContainerRef })
  protected readonly container: ViewContainerRef;
  @LazyService(ChangeDetectorRef)
  protected readonly cdr: ChangeDetectorRef;
  @LazyService(CUSTOM_RENDER_PROVIDER, null)
  protected readonly customRenderProvider: CustomRenderProvider;
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    // console.log(`page:`, this.configuration);
    const ij = Injector.create({
      providers: [
        { provide: COMPONENT_CONFIGURATION, useValue: this.configuration }
      ],
      parent: this.injector
    });

    let componentType: Type<any> = null;
    if (this.customRenderProvider) {
      componentType = await this.customRenderProvider.getRenderComponent(this.configuration);
    }

    componentType = componentType || PageContentComponent;

    this.container.createComponent(componentType, {
      injector: ij
    });
    this.cdr.markForCheck();
  }

}
