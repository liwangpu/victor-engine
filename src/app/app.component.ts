import { ChangeDetectionStrategy, Component, DoCheck } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const menuCollapseStatusKey = 'menuCollapseStatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements DoCheck {
  public isCollapsed = false;
  public constructor(
    translate: TranslateService
  ) {
    const menuCollapseStatusKeyStr = localStorage.getItem(menuCollapseStatusKey);
    if (menuCollapseStatusKeyStr) {
      this.isCollapsed = JSON.parse(menuCollapseStatusKeyStr);
    }
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('cn');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('cn');
  }
  ngDoCheck(): void {
    // console.log('check:',);
  }

  public ngOnInit(): void {

  }

  public toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(menuCollapseStatusKey, `${this.isCollapsed}`);
  }
}
