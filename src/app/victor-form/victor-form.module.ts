import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VictorFormRoutingModule } from './victor-form-routing.module';
import { HomeComponent } from './home/home.component';
import { FormModule } from 'victor-renderer/form';
import { JsonEditorModule } from '../json-editor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IconDefinition } from '@ant-design/icons-angular';
import * as antIcon from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PrimaryMarketModule } from 'primary-market';

const icons: Array<IconDefinition> = [antIcon.CloseCircleOutline];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    VictorFormRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    NzIconModule.forChild(icons),
    JsonEditorModule,
    PrimaryMarketModule,
    FormModule,
  ]
})
export class VictorFormModule { }
