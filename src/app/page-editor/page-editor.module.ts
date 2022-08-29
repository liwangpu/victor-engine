import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PageEditorRoutingModule } from './page-editor-routing.module';
import { PageListComponent } from './components/page-list/page-list.component';
import { PageManagementComponent } from './components/page-management/page-management.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as antIcon from '@ant-design/icons-angular/icons';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PageEditorComponent } from './components/page-editor/page-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { PageStoreService } from './services/page-store.service';
import { DynamicPageComponent } from './components/dynamic-page/dynamic-page.component';
import { PageDetailComponent } from './components/page-detail/page-detail.component';
import { DesignerModule } from 'victor-editor/designer';
import { COMPONENT_GROUP_SORT_RULE } from 'victor-editor';
import { RendererModule } from 'victor-renderer/renderer';
import { PageDefinitionResolver } from './services/page-definition.resolver';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { JsonEditorModule } from '../json-editor';
import { PageListPreviewGuard } from './services/page-list-preview.guard';
import { PrimaryMarketModule } from 'primary-market';
import { LocalMarketModule as VideoMarketModule } from '../video-player';
import { LocalMarketModule as FlexLayoutModule } from '../flex-layout';


const icons: Array<IconDefinition> = [antIcon.PlusOutline, antIcon.EditOutline, antIcon.LeftOutline, antIcon.FileFill];

@NgModule({
  declarations: [
    PageListComponent,
    PageManagementComponent,
    PageEditorComponent,
    DynamicPageComponent,
    PageDetailComponent
  ],
  imports: [
    CommonModule,
    PageEditorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    JsonEditorModule,
    NzIconModule.forChild(icons),
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzDrawerModule,
    // victor engine 
    PrimaryMarketModule,
    VideoMarketModule,
    FlexLayoutModule,
    RendererModule,
    DesignerModule,
  ],
  providers: [
    PageStoreService,
    PageDefinitionResolver,
    PageListPreviewGuard,
    { provide: COMPONENT_GROUP_SORT_RULE, useValue: ['form', 'container', 'button', 'other'] }
  ]
})
export class PageEditorModule { }
