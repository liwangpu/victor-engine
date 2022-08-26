import { Component, ChangeDetectionStrategy, Injector, ViewChild, ElementRef } from '@angular/core';
import { ComponentAction, DynamicComponent, PropertyEntry } from 'victor-core';

@Component({
  selector: 'app-vedio-player',
  templateUrl: './vedio-player.component.html',
  styleUrls: ['./vedio-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VedioPlayerComponent extends DynamicComponent {

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

}
