import { Component, OnInit, ChangeDetectionStrategy, Injector, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { SubSink } from 'subsink';
import { DynamicComponent, ComponentConfiguration, DynamicComponentRenderer, DYNAMIC_COMPONENT_RENDERER, LazyService } from 'victor-core';

@Component({
  selector: 'app-row-layout-container',
  templateUrl: './row-layout-container.component.html',
  styleUrls: ['./row-layout-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowLayoutContainerComponent extends DynamicComponent implements OnInit {

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
    if (this.container.length) { this.container.clear(); }
    if (!this.configuration?.type) { return; }
    const body: ComponentConfiguration[] = this.configuration.body || [];
    if (body.length) {
      for (let md of body) {
        await this.componentRenderer.render(this.injector, md, this.container);
      }
    }
    this.cdr.markForCheck();
  }

}
