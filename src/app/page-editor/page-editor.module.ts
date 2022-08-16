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
import { RunTimeModule as TabsRunTimeModule } from 'dynamic-tabs/run-time';
import { DesignTimeModule as TabsDesignTimeModule } from 'dynamic-tabs/design-time';
import { RunTimeModule as FormRunTimeModule } from 'dynamic-form/run-time';
import { DesignTimeModule as FormDesignTimeModule } from 'dynamic-form/design-time';
import { COMPONENT_GROUP_SORT_RULE } from 'victor-editor';
import { RendererModule } from 'victor-renderer/renderer';
import { PageDefinitionResolver } from './services/page-definition.resolver';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { JsonEditorModule } from '../json-editor';
import { NativeComponetMarketModule } from 'victor-core/native-componet-market';
import { FlexLayoutModule } from '../flex-layout';
import { PageListPreviewGuard } from './services/page-list-preview.guard';


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
    NativeComponetMarketModule,
    RendererModule,
    DesignerModule,
    TabsDesignTimeModule,
    TabsRunTimeModule,
    FormRunTimeModule,
    FormDesignTimeModule,
    FlexLayoutModule,
  ],
  providers: [
    PageStoreService,
    PageDefinitionResolver,
    PageListPreviewGuard,
    { provide: COMPONENT_GROUP_SORT_RULE, useValue: ['form', 'container'] }
  ]
})
export class PageEditorModule { }
