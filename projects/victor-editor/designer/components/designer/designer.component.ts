import { Component, OnInit, ChangeDetectionStrategy, Injector, ChangeDetectorRef, OnDestroy, forwardRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ComponentInfoProvider, ComponentMetadata, COMPONENT_INFO_PROVIDER, CUSTOM_RENDER_PROVIDER, DESIGN_INTERACTION_OPSAT, LazyService } from 'victor-core';
import { DesignInteractionOpsatService } from '../../services/design-interaction-opsat.service';
import { DropContainerOpsatService } from 'victor-editor/drop-container';
import { nestComponentTree, selectVictorDesignerState, setDesignerState, generateDesignState, resetDesignerState, VICTOR_DESIGNER_INITIAL_STATE, selectComponentBasicInfos, selectComponentMetadatas } from 'victor-editor/state-store';
import { SubSink } from 'subsink';
import { first } from 'rxjs/operators';
import { DESIGNER_STARTER, DesignerStarter, EditorHandler } from '../../tokens/designer-starter';
import { CustomRenderProviderService } from '../../services/custom-render-provider.service';

@Component({
  selector: 'victor-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DropContainerOpsatService,
    { provide: COMPONENT_INFO_PROVIDER, useExisting: forwardRef(() => DesignerComponent) },
    { provide: DESIGN_INTERACTION_OPSAT, useClass: DesignInteractionOpsatService },
    { provide: CUSTOM_RENDER_PROVIDER, useClass: CustomRenderProviderService },
  ]
})
export class DesignerComponent implements EditorHandler, ComponentInfoProvider, OnInit, OnDestroy {

  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(DESIGNER_STARTER)
  private readonly starter: DesignerStarter;
  @LazyService(Store)
  private readonly store: Store;
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) {
    this.starter.registryEditorHandler(this);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.store.dispatch(resetDesignerState({ source: DesignerComponent.name }));
    document.getElementById('victor-editor-drop-preview')?.remove();
  }

  async ngOnInit(): Promise<void> {
    const schema = await this.starter.getSchema();
    const state = generateDesignState(schema);
    this.store.dispatch(setDesignerState({ state, source: DesignerComponent.name }));
  }

  getComponentMetadata(): Promise<{ [type: string]: ComponentMetadata }> {
    return this.store.select(selectComponentMetadatas).pipe(first()).toPromise();
  }

  getComponentInfo(): Promise<{ id: string; type: string; title: string; }[]> {
    return this.store.select(selectComponentBasicInfos).pipe(first()).toPromise();
  }

  clear(): void {
    this.store.dispatch(setDesignerState({ state: VICTOR_DESIGNER_INITIAL_STATE, source: DesignerComponent.name }));
  }

  async save(): Promise<void> {
    const state = await this.store.select(selectVictorDesignerState).pipe(first()).toPromise();
    const schema = nestComponentTree(state);
    await this.starter.saveSchema(schema);
  }

}
