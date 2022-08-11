import { Component, OnInit, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicComponentMetadata } from 'victor-core';
import { DesignerStarter, DESIGNER_STARTER, EditorHandler } from 'victor-editor/designer';
import { PageStoreService } from '../../services/page-store.service';

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: DESIGNER_STARTER, useExisting: forwardRef(() => PageEditorComponent) }
  ]
})
export class PageEditorComponent implements DesignerStarter, OnInit {

  private editorHandler: EditorHandler;
  constructor(
    private router: Router,
    private acr: ActivatedRoute,
    private pageStore: PageStoreService
  ) {
  }


  public getSchema(): Promise<DynamicComponentMetadata> {
    const schema = this.acr.snapshot.data['schema'];
    // console.log('sss:',sss);
    return schema;
  }

  ngOnInit(): void {
  }

  registryEditorHandler(handler: EditorHandler): void {
    this.editorHandler = handler;
  }

  async saveSchema(schema: DynamicComponentMetadata): Promise<void> {
    console.log('save:', schema);
    await this.pageStore.update(schema.id as any, schema);
  }

  async save(): Promise<void> {
    await this.editorHandler.save();
  }

  goback(): void {
    this.router.navigateByUrl('./pages');
  }
}
