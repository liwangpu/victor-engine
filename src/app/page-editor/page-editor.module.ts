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

const icons: Array<IconDefinition> = [antIcon.PlusOutline, antIcon.EditOutline];

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
    DesignerModule,
    TabsDesignTimeModule,
    TabsRunTimeModule,
    NzIconModule.forChild(icons),
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule
  ],
  providers: [
    PageStoreService
  ]
})
export class PageEditorModule { }
