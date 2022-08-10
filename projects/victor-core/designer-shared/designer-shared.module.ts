import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigItemComponent } from './components/config-item/config-item.component';


@NgModule({
  declarations: [
    ConfigItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ConfigItemComponent
  ]
})
export class DesignerSharedModule { }
