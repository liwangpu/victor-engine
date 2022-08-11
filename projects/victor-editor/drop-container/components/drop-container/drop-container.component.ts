import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, HostBinding, ElementRef, ViewChild, ChangeDetectorRef, Injector, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Renderer2, NgZone } from '@angular/core';
import * as _ from 'lodash';
import { DropContainerOpsatService } from '../../services/drop-container-opsat.service';
import { SubSink } from 'subsink';
import SortableJs from 'sortablejs';
import { ComponentIdGenerator, COMPONENT_ID_GENERATOR, DynamicComponent, DynamicComponentMetadata, DynamicComponentRegistry, DYNAMIC_COMPONENT, DYNAMIC_COMPONENT_REGISTRY, LazyService, UNIQUE_ID } from 'victor-core';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngrx/store';
import { addNewComponent, moveComponent, selectFirstLevelBodyComponents, selectComponentMetadata, selectFirstLevelBodyComponentIds } from 'victor-editor/state-store';
import { ComponentDesignWrapperComponent } from '../component-design-wrapper/component-design-wrapper.component';
import { first, take } from 'rxjs/operators';
import Sortable from 'sortablejs';

@Component({
  selector: 'victor-designer-drop-container',
  templateUrl: './drop-container.component.html',
  styleUrls: ['./drop-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropContainerComponent extends DynamicComponent implements OnInit, OnDestroy {

  @HostBinding('class.actived')
  actived?: boolean;
  components: DynamicComponentMetadata[] = [];
  // @ViewChild('container', { static: true, read: ViewContainerRef })
  // private readonly container: ViewContainerRef;
  @ViewChild('dropContainer', { static: true })
  private readonly dropContainer: ElementRef;
  private subs = new SubSink();
  @LazyService(ComponentFactoryResolver)
  private readonly cfr: ComponentFactoryResolver;
  @LazyService(DropContainerOpsatService)
  private readonly opsat: DropContainerOpsatService;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(Renderer2)
  private readonly renderer: Renderer2;
  @LazyService(Store)
  private readonly store: Store;
  @LazyService(COMPONENT_ID_GENERATOR)
  private readonly idGenerator: ComponentIdGenerator;
  @LazyService(DYNAMIC_COMPONENT_REGISTRY)
  private readonly dynamicComponentRegistry: DynamicComponentRegistry;
  private sortable: Sortable;

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = this.store.select(selectFirstLevelBodyComponents(this.metadata.id))
      .subscribe(async components => {
        this.components = components;
        // if(this.metadata.id==='page'){
        //   console.log(`container ${this.metadata.id}`, components);
        // }
        // console.log(`container ${this.metadata.id}`, components);
        this.generateSortable();
        this.cdr.markForCheck();
      });
  }

  trackById(index: number, it: DynamicComponentMetadata): any {
    return it.id;
  }

  private generateSortable(): void {
    if (this.sortable) {
      this.sortable.destroy();
    }
    this.sortable = SortableJs.create(this.dropContainer.nativeElement, {
      group: {
        name: 'victor-editor'
      },
      // swapThreshold: 0,
      // fallbackOnBody: true,
      // draggable: ".drop-item",
      // dragClass: "drop-item",
      dragoverBubble: false,
      easing: "cubic-bezier(1, 0, 0, 1)",
      setData: async (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl: HTMLElement) => {
        const id = dragEl.id;
        const containers = dragEl.querySelectorAll('div.drop-container');
        containers.forEach(e => {
          this.renderer.addClass(e, 'hidden');
        });
        const metadata = await this.store.select(selectComponentMetadata(id)).pipe(first()).toPromise();
        dataTransfer.setData('Text', JSON.stringify({ id, type: metadata.type }));
      },
      onAdd: async (evt: SortableJs.SortableEvent) => {
        const dragEvt: DragEvent = (evt as any).originalEvent;
        const metadataStr = dragEvt.dataTransfer.getData('Text');
        if (!metadataStr) { return; }
        let metadata: DynamicComponentMetadata = JSON.parse(metadataStr);
        if (metadata.id) { return; }
        const des = await this.dynamicComponentRegistry.getComponentDescription(metadata.type);
        if (typeof des.metadataProvider === 'function') {
          const partialMetadata = await des.metadataProvider(metadata);
          metadata = { ...metadata, ...partialMetadata };
        }
        const componetId = await this.idGenerator.generate(metadata.type);
        this.store.dispatch(addNewComponent({ metadata: { ...metadata, id: componetId }, parentId: this.metadata.id, index: evt.newIndex, source: DropContainerComponent.name }));
      },
      onStart: (evt: SortableJs.SortableEvent) => {
        const dragEvt: DragEvent = (evt as any).originalEvent;
      },
      onEnd: async (evt: SortableJs.SortableEvent) => {
        var itemEl = evt.item;  // dragged HTMLElement
        // console.log('end:', evt);
        const containers = evt.item.querySelectorAll('div.drop-container');
        containers.forEach(e => {
          this.renderer.removeClass(e, 'hidden');
        });
        const containerId = evt.to.getAttribute('container-id');
        if (!containerId) { return; }
        const dragEvt: DragEvent = (evt as any).originalEvent;
        const metadataStr = dragEvt.dataTransfer.getData('Text');
        if (!metadataStr) { return; }
        const metadata: DynamicComponentMetadata = JSON.parse(metadataStr);
        if (evt.from !== evt.to) {
          itemEl.parentElement.removeChild(itemEl);
        }
        this.store.dispatch(moveComponent({ id: metadata.id, parentId: containerId, index: evt.newIndex, source: DropContainerComponent.name }));
      }
    });
  }

}
