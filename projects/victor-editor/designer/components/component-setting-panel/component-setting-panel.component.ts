import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ViewContainerRef, OnDestroy, Injector, ChangeDetectorRef, ComponentRef, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { ComponentDesignPanel, ComponentDesignPanelRegistry, COMPONENT_DESIGN_CONFIGURATION, COMPONENT_DESIGN_PANEL_REGISTRY, DesignInteractionOpsat, DESIGN_INTERACTION_OPSAT, INTERACTION_ACTION_EXECUTOR, INTERACTION_EVENT_OBSERVER, LazyService } from 'victor-core';
import { selectActiveComponentMetadata, selectActiveComponentId, setComponentMetadata, selectAllComponentIds } from 'victor-editor/state-store';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'victor-designer-component-setting-panel',
  templateUrl: './component-setting-panel.component.html',
  styleUrls: ['./component-setting-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentSettingPanelComponent implements OnInit, OnDestroy {

  @ViewChild('container', { static: true, read: ViewContainerRef })
  protected readonly container: ViewContainerRef;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(COMPONENT_DESIGN_PANEL_REGISTRY)
  private readonly designPanelRegistry: ComponentDesignPanelRegistry;
  @LazyService(DESIGN_INTERACTION_OPSAT)
  private readonly interactionOpsat: DesignInteractionOpsat;
  @LazyService(Store)
  private readonly store: Store;
  @LazyService(Renderer2)
  private readonly renderer: Renderer2;
  private panelMap = new Map<string, ComponentRef<ComponentDesignPanel>>();
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = this.store.select(selectAllComponentIds)
      .subscribe(ids => {
        const mids = new Set(ids);
        let deleted = false;
        this.panelMap.forEach((ref, id) => {
          if (!mids.has(id)) {
            const panelRef = this.panelMap.get(id);
            panelRef.destroy();
            this.panelMap.delete(id);
            deleted = true;
          }
        });
        if (deleted) {
          this.cdr.markForCheck();
        }
      });

    // TODO: 补充销毁
    this.subs.sink = this.store.select(selectActiveComponentMetadata)
      .pipe(filter(cfg => cfg ? true : false))
      .subscribe(async cfg => {
        let newPanel = false;
        if (!this.panelMap.has(cfg.id)) {
          const des = await this.designPanelRegistry.getComponentDescription(cfg.type);
          if (!des) { return; }
          const actionExecutor = (actionName: string, data?: any) => {
            this.interactionOpsat.execAction({ componentId: cfg.id, actionName, data });
          };
          const ij = Injector.create({
            providers: [
              { provide: COMPONENT_DESIGN_CONFIGURATION, useValue: cfg },
              { provide: INTERACTION_EVENT_OBSERVER, useValue: this.interactionOpsat.event$.pipe(filter(e => e.componentId === cfg.id)) },
              { provide: INTERACTION_ACTION_EXECUTOR, useValue: actionExecutor },
            ],
            parent: this.injector
          });
          const ref = this.container.createComponent(des.fac, null, ij);
          const valueChange$ = new Subject<any>();
          const sub = new SubSink();
          ref.instance.registerOnChange(val => {
            valueChange$.next(val);
          });
          sub.sink = valueChange$
            .pipe(debounceTime(120))
            .subscribe(val => {
              this.store.dispatch(
                setComponentMetadata({ id: cfg.id, metadata: { ...val, id: cfg.id, type: cfg.type }, source: ComponentSettingPanelComponent.name })
              );
            });
          ref.onDestroy(() => {
            sub.unsubscribe();
          });
          this.renderer.addClass(ref.location.nativeElement, 'configuration-panel');
          this.panelMap.set(cfg.id, ref);
          newPanel = true;
        }

        for (let [mid, ref] of this.panelMap) {
          const actived = mid === cfg.id;
          const nel = ref.location.nativeElement;
          if (actived) {
            if (!newPanel) {
              this.renderer.removeClass(nel, 'hidden');
              ref.changeDetectorRef.reattach();
            }
          } else {
            this.renderer.addClass(nel, 'hidden');
            ref.changeDetectorRef.detach();
          }
        }
        this.cdr.markForCheck();
      });
  }

}
