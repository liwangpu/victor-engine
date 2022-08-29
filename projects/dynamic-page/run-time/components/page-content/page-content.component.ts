import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ViewContainerRef, ChangeDetectorRef, Injector } from '@angular/core';
import { ComponentConfiguration, COMPONENT_CONFIGURATION, DynamicComponentRenderer, DYNAMIC_COMPONENT_RENDERER, LazyService } from 'victor-core';

@Component({
  selector: 'victor-dynamic-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageContentComponent implements OnInit {

  @LazyService(COMPONENT_CONFIGURATION)
  readonly configuration: ComponentConfiguration;
  @ViewChild('container', { static: true, read: ViewContainerRef })
  protected readonly container: ViewContainerRef;
  @LazyService(ChangeDetectorRef)
  protected readonly cdr: ChangeDetectorRef;
  @LazyService(DYNAMIC_COMPONENT_RENDERER)
  private readonly componentRenderer: DynamicComponentRenderer;
  constructor(
    protected injector: Injector
  ) { }

  async ngOnInit(): Promise<void> {
    const body: ComponentConfiguration[] = this.configuration.body || [];
    if (body.length) {
      await Promise.all(body.map(md => this.componentRenderer.render(this.injector, md, this.container)));
    }
    this.cdr.markForCheck();
  }

}
