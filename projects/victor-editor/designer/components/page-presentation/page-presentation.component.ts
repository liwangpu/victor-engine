import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, Injector, ViewContainerRef, ViewChild } from '@angular/core';
import { DYNAMIC_COMPONENT, COMPONENT_CONFIGURATION, LazyService, DYNAMIC_COMPONENT_RENDERER, DynamicComponentRenderer } from 'victor-core';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { selectTopComponentTree } from 'victor-editor/state-store';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'victor-designer-page-presentation',
  templateUrl: './page-presentation.component.html',
  styleUrls: ['./page-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: DYNAMIC_COMPONENT, useExisting: forwardRef(() => PagePresentationComponent) }
  ]
})
export class PagePresentationComponent implements OnInit {

  dropContainers: string[] = [];
  @ViewChild('container', { static: true, read: ViewContainerRef })
  protected container: ViewContainerRef;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(Store)
  private readonly store: Store;
  @LazyService(DYNAMIC_COMPONENT_RENDERER)
  private readonly componentRenderer: DynamicComponentRenderer;
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = this.store.select(selectTopComponentTree)
      .pipe(filter(t => t ? true : false), first())
      .subscribe(async md => {
        const ij = Injector.create({
          providers: [
            { provide: COMPONENT_CONFIGURATION, useValue: md }
          ],
          parent: this.injector
        });
        await this.componentRenderer.render(ij, md as any, this.container);
        this.cdr.markForCheck();
      });
  }

}

