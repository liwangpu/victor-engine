import { Component, OnInit, ChangeDetectionStrategy, Injector, OnDestroy, ViewChild, ViewContainerRef, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { SubSink } from 'subsink';
import { DynamicComponentMetadata, DynamicComponentRenderer, DYNAMIC_COMPONENT_RENDERER, LazyService } from 'victor-core';
import { RENDERER_STARTER, RendererStarter } from '../../tokens/renderer-starter';

@Component({
  selector: 'victor-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RendererComponent implements OnInit, OnDestroy {

  @ViewChild('container', { static: true, read: ViewContainerRef })
  readonly container: ViewContainerRef;
  @LazyService(RENDERER_STARTER)
  private readonly starter: RendererStarter;
  @LazyService(DYNAMIC_COMPONENT_RENDERER)
  private readonly componentRenderer: DynamicComponentRenderer;
  @LazyService(Renderer2)
  private readonly renderer: Renderer2;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  private readonly subs = new SubSink();
  constructor(
    protected injector: Injector
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = this.starter.getSchema()
      .subscribe(async metadata => {
        if (this.container.length) { this.container.clear(); }
        if (!metadata) { return; }
        await this.renderComponent(metadata);
      });
  }

  private async renderComponent(metadata: DynamicComponentMetadata): Promise<void> {
    if (this.container.length) { this.container.clear(); }
    if (!metadata?.type) { return; }
    const body: DynamicComponentMetadata[] = metadata.body || [];
    if (body.length) {
      for (let md of body) {
        await this.componentRenderer.render(this.injector, md, this.container);
      }
    }
    this.cdr.markForCheck();
  }
}
