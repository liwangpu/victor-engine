import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, Injector, ComponentFactoryResolver, ViewContainerRef, ViewChild, HostListener } from '@angular/core';
import { DynamicComponent, DynamicComponentMetadata, DynamicComponentRegistry, DYNAMIC_COMPONENT, DYNAMIC_COMPONENT_METADATA, DYNAMIC_COMPONENT_REGISTRY, LazyService } from 'victor-core';
import { DropContainerComponent, DropContainerOpsatService } from 'victor-editor/drop-container';
import { SubSink } from 'subsink';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngrx/store';
import { activeComponent, selectPageTree } from 'victor-editor/state-store';
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
  private metadata: DynamicComponentMetadata;
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) {
  }

  ngOnDestroy(): void {
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

  }

  @HostListener('click', ['$event'])
  onActive(event: MouseEvent): void {
    event.stopPropagation();
    this.store.dispatch(activeComponent({ id: this.metadata.id, source: PagePresentationComponent.name }));
  }
}

