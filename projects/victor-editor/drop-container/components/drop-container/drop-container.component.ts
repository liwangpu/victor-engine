import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, HostBinding, ElementRef, ViewChild, ChangeDetectorRef, Injector, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Renderer2, NgZone } from '@angular/core';
import * as _ from 'lodash';
import { SubSink } from 'subsink';
import SortableJs from 'sortablejs';
import { ComponentIdGenerator, COMPONENT_ID_GENERATOR, DynamicComponent, ComponentConfiguration, LazyService, ComponentDiscoveryService } from 'victor-core';
import { Store } from '@ngrx/store';
import { addNewComponent, moveComponent, selectFirstLevelBodyComponents, selectComponentConfiguration } from 'victor-editor/state-store';
import { first, distinctUntilChanged } from 'rxjs/operators';
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
  components: ComponentConfiguration[] = [];

  @ViewChild('componentContainer', { static: true, read: ViewContainerRef })
  private readonly componentContainer: ViewContainerRef;

  @ViewChild('dropContainer', { static: true })
  private readonly dropContainer: ElementRef;
  private subs = new SubSink();
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(Renderer2)
  private readonly renderer: Renderer2;
  @LazyService(Store)
  private readonly store: Store;
  @LazyService(COMPONENT_ID_GENERATOR)
  private readonly idGenerator: ComponentIdGenerator;
  @LazyService(ComponentDiscoveryService)
  protected readonly componentDiscovery: ComponentDiscoveryService;
  @LazyService(NgZone)
  private readonly zone: NgZone;
  private componentRefMap = new Map<string, [ComponentRef<DynamicComponent>, number]>();
  private sortable: Sortable;
  private previewNode: HTMLElement;

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    // console.log(`ccc:`, this.configuration.id);
    this.subs.sink = this.store.select(selectFirstLevelBodyComponents(this.configuration.id))
      .pipe(distinctUntilChanged(_.isEqual))
      .subscribe(async (components: { id: string, type: string, title: string }[]) => {
        this.components = components;
        // console.log(`child components:`, components);
        this.cdr.markForCheck();
        this.generateSortable();
      });
  }

  trackById(index: number, it: ComponentConfiguration): any {
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
      dragoverBubble: false,
      easing: "cubic-bezier(1, 0, 0, 1)",
      setData: async (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl: HTMLElement) => {
        const id = dragEl.getAttribute('component-id');
        const containers = dragEl.querySelectorAll('div.drop-container');
        containers.forEach(e => {
          this.renderer.addClass(e, 'hidden');
        });
        const pid = 'victor-editor-drop-preview';
        this.previewNode = document.getElementById(pid)
        if (!this.previewNode) {
          this.previewNode = document.createElement('div');
          this.previewNode.id = pid;
          document.body.appendChild(this.previewNode);
        } else {
          this.renderer.removeClass(this.previewNode, 'hidden');
        }

        dataTransfer.setDragImage(this.previewNode, 0, 0);
        const configuration = await this.store.select(selectComponentConfiguration(id)).pipe(first()).toPromise();
        this.previewNode.innerHTML = configuration.title;
        dataTransfer.setData('Text', JSON.stringify({ id, type: configuration.type }));
      },
      onAdd: async (evt: SortableJs.SortableEvent) => {
        const dragEvt: DragEvent = (evt as any).originalEvent;
        const configurationStr = dragEvt.dataTransfer.getData('Text');
        if (!configurationStr) { return; }
        let configuration: ComponentConfiguration = JSON.parse(configurationStr);
        if (configuration.id) { return; }
        const moduleRef = await this.componentDiscovery.loadComponentRunTimeModuleRef(configuration.type);
        if (!moduleRef) { return null; }
        const componentType = moduleRef.instance.getComponentType(configuration.type);
        const implementInitalConfigurationProvider = typeof (componentType as any).configurationProvider === 'function';
        if (implementInitalConfigurationProvider) {
          const context = { injector: parent, idGenerator: this.idGenerator };
          const partialConfig = await (componentType as any).configurationProvider(_.cloneDeep(configuration), context);
          if (partialConfig) {
            configuration = { ...configuration, ...partialConfig };
          }
        }
        const componetId = await this.idGenerator.generate(configuration.type);
        this.store.dispatch(addNewComponent({ configuration: { ...configuration, id: componetId }, parentId: this.configuration.id, index: evt.newIndex, source: DropContainerComponent.name }));
      },
      onStart: (evt: SortableJs.SortableEvent) => {
        // const dragEvt: DragEvent = (evt as any).originalEvent;
      },
      onEnd: async (evt: SortableJs.SortableEvent) => {
        if (this.previewNode) {
          this.renderer.addClass(this.previewNode, 'hidden');
        }
        var itemEl = evt.item;
        const containers = evt.item.querySelectorAll('div.drop-container');
        containers.forEach(e => {
          this.renderer.removeClass(e, 'hidden');
        });
        const containerId = evt.to.getAttribute('container-id');
        if (!containerId) { return; }
        const dragEvt: DragEvent = (evt as any).originalEvent;
        const configurationStr = dragEvt.dataTransfer.getData('Text');
        if (!configurationStr) { return; }
        const configuration: ComponentConfiguration = JSON.parse(configurationStr);
        if (evt.from !== evt.to) {
          itemEl.parentElement.removeChild(itemEl);
        }
        this.store.dispatch(moveComponent({ id: configuration.id, parentId: containerId, index: evt.newIndex, source: DropContainerComponent.name }));
      }
    });
  }

}
