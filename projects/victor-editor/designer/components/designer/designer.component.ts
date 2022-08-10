import { Component, OnInit, ChangeDetectionStrategy, Injector, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { DESIGN_INTERACTION_OPSAT, LazyService } from 'victor-core';
import { DesignInteractionOpsatService } from '../../services/design-interaction-opsat.service';
import { DropContainerOpsatService } from 'victor-editor/drop-container';
import { FORM_DESIGNER_INITIAL_STATE, selectFormDesignerState, setDesignerState } from 'victor-editor/state-store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SubSink } from 'subsink';

const designerDraft = 'formDesignerDraf';

@Component({
  selector: 'victor-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DropContainerOpsatService,
    { provide: DESIGN_INTERACTION_OPSAT, useClass: DesignInteractionOpsatService }
  ]
})
export class DesignerComponent implements OnInit, OnDestroy {

  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(Store)
  private readonly store: Store;
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) {
    if (sessionStorage.getItem(designerDraft)) {
      this.store.dispatch(setDesignerState({ state: JSON.parse(sessionStorage.getItem(designerDraft)), source: DesignerComponent.name }));
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.store.dispatch(setDesignerState({ state: FORM_DESIGNER_INITIAL_STATE, source: DesignerComponent.name }));
  }

  ngOnInit(): void {
    this.subs.sink = this.store.select(selectFormDesignerState)
      // .pipe(debounceTime(120))
      .subscribe(state => {
        sessionStorage.setItem(designerDraft, JSON.stringify(state));
      });
  }

  clearCache(): void {
    // sessionStorage.removeItem(designerDraft);
    // location.reload();
    this.store.dispatch(setDesignerState({ state: FORM_DESIGNER_INITIAL_STATE, source: DesignerComponent.name }));
  }

}
