import { Component, OnInit, ChangeDetectionStrategy, Injector, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CUSTOM_RENDER_PROVIDER, DESIGN_INTERACTION_OPSAT, LazyService } from 'victor-core';
import { DesignInteractionOpsatService } from '../../services/design-interaction-opsat.service';
import { DropContainerOpsatService } from 'victor-editor/drop-container';
import { VICTOR_DESIGNER_INITIAL_STATE, nestComponentTree, selectVictorDesignerState, setDesignerState, flatComponentTree, generateDesignState, resetDesignerState } from 'victor-editor/state-store';
import { SubSink } from 'subsink';
import { first } from 'rxjs/operators';
import { DESIGNER_STARTER, DesignerStarter, EditorHandler } from '../../tokens/designer-starter';
import { CustomRenderProviderService } from 'victor-editor/designer/services/custom-render-provider.service';

const designerDraft = 'formDesignerDraf';

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
    // if (sessionStorage.getItem(designerDraft)) {
    //   this.store.dispatch(setDesignerState({ state: JSON.parse(sessionStorage.getItem(designerDraft)), source: DesignerComponent.name }));
    // }
  }

  async save(): Promise<void> {
    const state = await this.store.select(selectVictorDesignerState).pipe(first()).toPromise();
    const schema = nestComponentTree(state);
    await this.starter.saveSchema(schema);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.store.dispatch(resetDesignerState({ source: DesignerComponent.name }));
  }

  async ngOnInit(): Promise<void> {
    const schema = await this.starter.getSchema();
    const state = generateDesignState(schema);
    // console.log('schema:', schema);
    // console.log('state:', state);
    this.store.dispatch(setDesignerState({ state, source: DesignerComponent.name }));

    this.subs.sink = this.store.select(selectVictorDesignerState)
      // .pipe(debounceTime(120))
      .subscribe(state => {
        sessionStorage.setItem(designerDraft, JSON.stringify(state));
      });
  }

  clearCache(): void {
    // sessionStorage.removeItem(designerDraft);
    // location.reload();
    this.store.dispatch(setDesignerState({ state: VICTOR_DESIGNER_INITIAL_STATE, source: DesignerComponent.name }));
  }

}
