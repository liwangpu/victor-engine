import { Component, OnInit, ChangeDetectionStrategy, forwardRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OpsatService } from 'src/app/services/opsat.service';
import { SubSink } from 'subsink';
import { DynamicComponentMetadata } from 'victor-core';
import { RendererStarter, RENDERER_STARTER } from 'victor-renderer/renderer';
import { PageStoreService } from '../../services/page-store.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: RENDERER_STARTER, useExisting: forwardRef(() => DynamicPageComponent) }
  ]
})
export class DynamicPageComponent implements RendererStarter, OnInit, OnDestroy {

  editorVisible: boolean;
  pageSchema$ = new BehaviorSubject<DynamicComponentMetadata>(null);
  pageSchema: DynamicComponentMetadata;
  private readonly subs = new SubSink();
  constructor(
    private acr: ActivatedRoute,
    private pageStore: PageStoreService,
    private opsat: OpsatService
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    this.subs.sink = this.acr.data
      .pipe(map(d => d.definition))
      .subscribe(schema => {
        this.pageSchema$.next(schema);
      });
  }

  async onEditorClose(): Promise<void> {
    this.editorVisible = false;
    if (_.isEqual(this.pageSchema, this.pageSchema$.value)) { return; }
    await this.pageStore.update(this.pageSchema.id, this.pageSchema);
    this.pageSchema$.next(this.pageSchema);
    this.opsat.publish('page-update');
  }

  editorPage(): void {
    this.pageSchema = this.pageSchema$.value;
    this.editorVisible = true;
  }

  getSchema(): Observable<DynamicComponentMetadata> {
    return this.pageSchema$;
  }


}
