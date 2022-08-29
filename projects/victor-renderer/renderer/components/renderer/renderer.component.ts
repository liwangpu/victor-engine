import { Component, OnInit, ChangeDetectionStrategy, Injector, ViewChild, ViewContainerRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { ComponentConfiguration, DynamicComponentRenderer, DYNAMIC_COMPONENT_RENDERER, DYNAMIC_PAGE_ID, LazyService } from 'victor-core';
import { DynamicComponentRendererService } from '../../services/dynamic-component-renderer.service';
import { RENDERER_STARTER, RendererStarter } from '../../tokens/renderer-starter';

@Component({
  selector: 'victor-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: DYNAMIC_COMPONENT_RENDERER, useClass: DynamicComponentRendererService },
  ]
})
export class RendererComponent implements OnInit, OnDestroy {

  @ViewChild('container', { static: true, read: ViewContainerRef })
  readonly container: ViewContainerRef;
  @LazyService(RENDERER_STARTER)
  private readonly starter: RendererStarter;
  @LazyService(DYNAMIC_COMPONENT_RENDERER)
  private readonly componentRenderer: DynamicComponentRenderer;
  @LazyService(ChangeDetectorRef)
  protected readonly cdr: ChangeDetectorRef;
  private readonly subs = new SubSink();
  constructor(
    protected injector: Injector
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = this.starter.getSchema()
      .subscribe(async configuration => {
        if (this.container.length) { this.container.clear(); }
        if (!configuration) { return; }
        await this.renderComponent(configuration);
      });
  }

  private async renderComponent(configuration: ComponentConfiguration): Promise<void> {
    if (this.container.length) { this.container.clear(); }
    if (!configuration?.type) { return; }
    // console.log(`config:`, configuration);
    // const body: ComponentConfiguration[] = configuration.body || [];
    const ij = Injector.create({
      providers: [
        { provide: DYNAMIC_PAGE_ID, useValue: configuration.id }
      ],
      parent: this.injector
    });
    // if (body.length) {
    //   await Promise.all(body.map(md => this.componentRenderer.render(ij, md, this.container)));
    // }
    await this.componentRenderer.render(ij, configuration, this.container);
    this.cdr.markForCheck();
  }

}
