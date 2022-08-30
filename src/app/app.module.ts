import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconDefinition } from '@ant-design/icons-angular';
import * as antIcon from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NzMenuModule } from 'ng-zorro-antd/menu';

registerLocaleData(zh);

const ngZorroConfig: NzConfig = {
  // 注意组件名称没有 nz 前缀
  notification: {
    nzDuration: 2000,
    nzPlacement: 'bottomRight'
  }
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


const icons: Array<IconDefinition> = [antIcon.MenuFoldOutline, antIcon.MenuUnfoldOutline, antIcon.LayoutOutline, antIcon.FormOutline, antIcon.ShopOutline];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'cn'
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument(),
    NzIconModule.forRoot(icons),
    NzNotificationModule,
    NzMenuModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    { provide: 'my-v', useValue: 'root' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
