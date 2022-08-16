import { Component, OnInit, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentConfiguration } from 'victor-core';
import { DesignerStarter, DESIGNER_STARTER, EditorHandler } from 'victor-editor/designer';
import { PageStoreService } from '../../services/page-store.service';
import { OperationMessageService } from 'src/app/services/operation-message.service';

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
    private pageStore: PageStoreService,
    private operationSrv: OperationMessageService
  ) {
  }


  public getSchema(): Promise<ComponentConfiguration> {
    const schema = this.acr.snapshot.data['schema'];
    return schema;
  }

  ngOnInit(): void {
  }

  registryEditorHandler(handler: EditorHandler): void {
    this.editorHandler = handler;
  }

  async saveSchema(schema: ComponentConfiguration): Promise<void> {
    await this.pageStore.update(schema.id as any, schema);
  }

  async save(): Promise<void> {
    await this.editorHandler.save();
    this.operationSrv.success('保存成功');
  }

  goback(): void {
    const schema: ComponentConfiguration = this.acr.snapshot.data['schema'];
    this.router.navigate(['/pages', 'list', 'dynamic', schema.id]);
  }
}
