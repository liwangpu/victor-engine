import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { ComponentRunTimeModule, DynamicComponent } from 'victor-core';



@NgModule({
  declarations: [
    VideoPlayerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RunTimeModule implements ComponentRunTimeModule {

  getComponentType(type: string): Type<DynamicComponent> {
    return VideoPlayerComponent;
  }
}
