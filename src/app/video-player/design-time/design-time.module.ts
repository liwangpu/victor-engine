import { NgModule, Type } from '@angular/core';
import { VideoPlayerConfigurationComponent } from './video-player-configuration/video-player-configuration.component';
import { ComponentDesignPanel, ComponentDesignTimeModule } from 'victor-core';
import { CommonModule as ShareCommonModule } from 'victor-editor-shared/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@NgModule({
  declarations: [
    VideoPlayerConfigurationComponent
  ],
  imports: [
    ShareCommonModule,
    NzSwitchModule
  ]
})
export class DesignTimeModule implements ComponentDesignTimeModule {

  getComponentType(type: string): Type<ComponentDesignPanel> {
    return VideoPlayerConfigurationComponent;
  }
}
