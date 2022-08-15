import { Component, OnInit, ChangeDetectionStrategy, Injector, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CUSTOM_RENDER_PROVIDER, DESIGN_INTERACTION_OPSAT, LazyService } from 'victor-core';
import { DesignInteractionOpsatService } from '../../services/design-interaction-opsat.service';
import { DropContainerOpsatService } from 'victor-editor/drop-container';
import { nestComponentTree, selectVictorDesignerState, setDesignerState, generateDesignState, resetDesignerState } from 'victor-editor/state-store';
import { SubSink } from 'subsink';
import { first } from 'rxjs/operators';
import { DESIGNER_STARTER, DesignerStarter, EditorHandler } from '../../tokens/designer-starter';
import { CustomRenderProviderService } from 'victor-editor/designer/services/custom-render-provider.service';

@Component({
  selector: 'victor-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DropContainerOpsatService,
    { provide: DESIGN_INTERACTION_OPSAT, useClass: DesignInteractionOpsatService },
    { provide: CUSTOM_RENDER_PROVIDER, useClass: CustomRenderProviderService },
  ]
})
export class DesignerComponent implements EditorHandler, OnInit, OnDestroy {

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

  async save(): Promise<void> {
    const state = await this.store.select(selectVictorDesignerState).pipe(first()).toPromise();
    const schema = nestComponentTree(state);
    await this.starter.saveSchema(schema);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.store.dispatch(resetDesignerState({ source: DesignerComponent.name }));
    document.getElementById('victor-editor-drop-preview').remove();
  }

  async ngOnInit(): Promise<void> {
    const schema = await this.starter.getSchema();
    const state = generateDesignState(schema);
    this.store.dispatch(setDesignerState({ state, source: DesignerComponent.name }));
  }

}
