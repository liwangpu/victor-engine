import { Component, OnInit, ChangeDetectionStrategy, Injector, Inject, ViewChild, ViewContainerRef, ChangeDetectorRef, OnDestroy, HostBinding, HostListener, Input, NgZone, ElementRef, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { DesignInteractionOpsat, DESIGN_INTERACTION_OPSAT, DynamicComponentMetadata, DynamicComponentRenderer, DYNAMIC_COMPONENT_RENDERER, LazyService, UNIQUE_ID } from 'victor-core';
import { activeComponent, selectActiveComponentId, selectComponentMetadata } from 'victor-editor/state-store';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { DropContainerOpsatService } from '../../services/drop-container-opsat.service';

@Component({
  selector: 'victor-designer-component-design-wrapper',
  templateUrl: './component-design-wrapper.component.html',
  styleUrls: ['./component-design-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentDesignWrapperComponent implements OnInit, OnDestroy {

  @Input()
  metadata: DynamicComponentMetadata;
  @HostBinding('class.actived')
  actived: boolean;
  @ViewChild('container', { static: true, read: ViewContainerRef })
  readonly container: ViewContainerRef;

  @LazyService(DYNAMIC_COMPONENT_RENDERER)
  private readonly componentRenderer: DynamicComponentRenderer;
  @LazyService(DESIGN_INTERACTION_OPSAT)
  private readonly interactionOpsat: DesignInteractionOpsat;
  // @LazyService(INTERACTION_EVENT_PUBLISHER, null)
  // private readonly eventPublisher: (eventName: string, data?: any) => void;
  @LazyService(ElementRef)
  private readonly el: ElementRef;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(NgZone)
  private readonly zone: NgZone;
  @LazyService(Renderer2)
  private readonly renderer: Renderer2;
  @LazyService(DropContainerOpsatService, null)
  private readonly opsat: DropContainerOpsatService;
  @LazyService(Store)
  private readonly store: Store;
  private mouseEnterListenFn: (e: MouseEvent) => void;
  private mouseLeaveListenFn: (e: MouseEvent) => void;
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) {
  }

  ngOnDestroy(): void {
    // console.log('des:',);
    const nel: HTMLElement = this.el.nativeElement;
    if (this.mouseEnterListenFn) {
      nel.removeEventListener('mouseenter', this.mouseEnterListenFn);
    }
    if (this.mouseLeaveListenFn) {
      nel.removeEventListener('mouseleave', this.mouseLeaveListenFn);
    }
    this.subs.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    this.subs.sink = this.store.select(selectComponentMetadata(this.metadata.id))
      .pipe(distinctUntilChanged(_.isEqual))
      .subscribe(metadata => {
        this.renderComponent(metadata);
      });
    this.subs.sink = this.store.select(selectActiveComponentId)
      .subscribe(id => {
        this.actived = this.metadata.id === id;
        this.cdr.markForCheck();
      });

    this.zone.runOutsideAngular(() => {
      if (this.opsat) {
        const nel: HTMLElement = this.el.nativeElement;
        this.mouseEnterListenFn = () => {
          this.opsat.publishComponentHover(this.metadata.id);
        };
        this.mouseLeaveListenFn = () => {
          this.opsat.publishComponentUnHover();
        };
        nel.addEventListener('mouseenter', this.mouseEnterListenFn);
        nel.addEventListener('mouseleave', this.mouseLeaveListenFn);

        this.subs.sink = this.opsat.componentHovering$
          .subscribe(id => {
            if (this.metadata.id === id) {
              this.renderer.addClass(nel, 'hover');
            } else {
              this.renderer.removeClass(nel, 'hover');
            }
          });
      }
    });
  }

  @HostListener('click', ['$event'])
  onActive(event: MouseEvent): void {
    event.stopPropagation();
    this.store.dispatch(activeComponent({ id: this.metadata.id, source: ComponentDesignWrapperComponent.name }));
  }

  private async renderComponent(metadata: DynamicComponentMetadata): Promise<void> {
    if (this.container.length) { this.container.clear(); }
    if (!metadata?.type) { return; }

    const ref = await this.componentRenderer.render(this.injector, metadata, this.container);
    const { events, actions } = ref.instance['getMetaDataDescription']();
    const subs = new SubSink();
    events.forEach(e => {
      if (this.interactionOpsat) {
        subs.sink = (ref.instance[e.key] as Observable<any>)
          .subscribe(data => {
            this.interactionOpsat.publishEvent({ componentId: metadata.id, eventName: e.key, data });
          });
      }
    });

    this.interactionOpsat.action$
      .pipe(filter(act => act.componentId === metadata.id))
      .subscribe(act => {
        ref.instance[act.actionName](act.data);
      });
    // console.log('events:', events);
    ref.onDestroy(() => {
      subs.unsubscribe();
    });
    this.cdr.markForCheck();
  }
}
