import { Component, OnInit, ChangeDetectionStrategy, Injector, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { SubSink } from 'subsink';
import { DynamicComponent, DynamicComponentMetadata, DynamicComponentRenderer, DYNAMIC_COMPONENT_RENDERER, LazyService } from 'victor-core';

@Component({
  selector: 'victor-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent extends DynamicComponent implements OnInit {

  @ViewChild('container', { static: true, read: ViewContainerRef })
  readonly container: ViewContainerRef;
  @LazyService(DYNAMIC_COMPONENT_RENDERER)
  private readonly componentRenderer: DynamicComponentRenderer;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  private readonly subs = new SubSink();
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    // console.log('mm:', this.metadata);
    if (this.container.length) { this.container.clear(); }
    if (!this.metadata?.type) { return; }
    const body: DynamicComponentMetadata[] = this.metadata.body || [];
    if (body.length) {
      for (let md of body) {
        await this.componentRenderer.render(this.injector, md, this.container);
      }
    }
    this.cdr.markForCheck();
  }

}
