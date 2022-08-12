import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, Injector, ComponentFactoryResolver, ViewContainerRef, ViewChild, HostListener, NgZone, Renderer2, ElementRef } from '@angular/core';
import { DynamicComponent, DynamicComponentMetadata, DynamicComponentRegistry, DYNAMIC_COMPONENT, DYNAMIC_COMPONENT_METADATA, DYNAMIC_COMPONENT_REGISTRY, LazyService } from 'victor-core';
import { DropContainerComponent, DropContainerOpsatService } from 'victor-editor/drop-container';
import { SubSink } from 'subsink';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngrx/store';
import { activeComponent, selectActiveComponentId, selectPageTree } from 'victor-editor/state-store';
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
  @LazyService(ComponentFactoryResolver)
  protected cfr: ComponentFactoryResolver;
  @LazyService(Store)
  private readonly store: Store;
  @LazyService(ElementRef)
  private readonly el: ElementRef;
  @LazyService(NgZone)
  private readonly zone: NgZone;
  @LazyService(DropContainerOpsatService, null)
  private readonly opsat: DropContainerOpsatService;
  @LazyService(Renderer2)
  private readonly renderer: Renderer2;
  private mouseEnterListenFn: (e: MouseEvent) => void;
  private mouseLeaveListenFn: (e: MouseEvent) => void;
  private metadata: DynamicComponentMetadata;
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) {
  }

  ngOnDestroy(): void {
    const nel: HTMLElement = this.el.nativeElement;
    if (this.mouseEnterListenFn) {
      nel.removeEventListener('mouseenter', this.mouseEnterListenFn);
    }
    if (this.mouseLeaveListenFn) {
      nel.removeEventListener('mouseleave', this.mouseLeaveListenFn);
    }
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = this.store.select(selectPageTree)
      .pipe(filter(t => t ? true : false), first())
      .subscribe(md => {
        this.metadata = md as any;
        const fac = this.cfr.resolveComponentFactory(DropContainerComponent);
        const ij = Injector.create({
          providers: [
            { provide: DYNAMIC_COMPONENT_METADATA, useValue: md }
          ],
          parent: this.injector
        });
        this.container.createComponent(fac, null, ij);
        this.cdr.markForCheck();
      });

    this.zone.runOutsideAngular(() => {
      const nel: HTMLElement = this.el.nativeElement;
      this.subs.sink = this.store.select(selectActiveComponentId)
        .pipe(filter(() => this.metadata ? true : false))
        .subscribe(id => {
          if (this.metadata.id === id) {
            this.renderer.addClass(nel, 'actived');
          } else {
            this.renderer.removeClass(nel, 'actived');
          }
        });
      if (this.opsat) {
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
    this.store.dispatch(activeComponent({ id: this.metadata.id, source: PagePresentationComponent.name }));
  }
}

