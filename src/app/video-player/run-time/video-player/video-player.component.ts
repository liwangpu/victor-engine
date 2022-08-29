import { Component, ChangeDetectionStrategy, Injector, ViewChild, ElementRef } from '@angular/core';
import { ComponentAction, DynamicComponent, IHasInitialConfiguration, InitialConfigurationProvider, PartialComponentConfiguration, PropertyEntry } from 'victor-core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent extends DynamicComponent implements InitialConfigurationProvider<IHasInitialConfiguration, typeof VideoPlayerComponent>  {

  @PropertyEntry('configuration.vedioUrl')
  vedioUrl: string;
  @PropertyEntry('configuration.showControl')
  showControl: boolean;
  @PropertyEntry('configuration.autoplay')
  autoplay: boolean;
  @ViewChild('videoRef', { static: true })
  videoRef: ElementRef;
  get video(): HTMLMediaElement {
    return this.videoRef.nativeElement;
  }
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  @ComponentAction('切换播放暂停')
  togglePlay(): void {
    if (this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }

  @ComponentAction('播放')
  play(): void {
    this.video.play();
  }

  @ComponentAction('暂停')
  pause(): void {
    this.video.pause();
  }

  @ComponentAction('全屏播放')
  fullscreen(): void {
    if (this.video.requestFullscreen) {
      this.video.requestFullscreen();
      this.video.play();
    }
  }

  static async configurationProvider(partial: PartialComponentConfiguration, context: { injector: Injector }): Promise<PartialComponentConfiguration> {
    return {
      vedioUrl: "https://www.runoob.com/try/demo_source/movie.ogg"
    };
  }
}
