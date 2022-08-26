import { ComponentFactoryResolver, Inject, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ComponentDesignPanelRegistry, ComponentIdGenerator, COMPONENT_DESIGN_PANEL_REGISTRY, COMPONENT_ID_GENERATOR, DynamicComponentRegistry, DYNAMIC_COMPONENT_REGISTRY, PartialComponentMetadata } from 'victor-core';
import { LoginConfigurationComponent } from './components/login-configuration/login-configuration.component';
import { DesignerSharedModule } from 'victor-core/designer-shared';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { VedioPlayerComponent } from './components/vedio-player/vedio-player.component';
import { VedioPlayerConfigurationComponent } from './components/vedio-player-configuration/vedio-player-configuration.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginConfigurationComponent,
    VedioPlayerComponent,
    VedioPlayerConfigurationComponent,
  ],
  imports: [
    DesignerSharedModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzTabsModule,
    NzSwitchModule
  ]
})
export class AppLoginModule {

  constructor(
    @Optional()
    @Inject(DYNAMIC_COMPONENT_REGISTRY)
    componentRegistry: DynamicComponentRegistry,
    @Inject(COMPONENT_DESIGN_PANEL_REGISTRY)
    designPanelRegistry: ComponentDesignPanelRegistry,
    @Inject(COMPONENT_ID_GENERATOR)
    idGenerator: ComponentIdGenerator,
    cfr: ComponentFactoryResolver
  ) {
    if (componentRegistry) {
      componentRegistry.registry({
        type: 'login',
        title: '登录表单',
        group: 'other',
        fac: cfr.resolveComponentFactory(LoginComponent),
        metadataProvider: async (partial: PartialComponentMetadata) => ({
          logoUrl: 'https://file.qingflow.com/assets/logo.png',
          companyInfoUrl: 'https://file.qingflow.com/official-page/multiple-page/form/s9-2.png',
          body: [
            {
              id: await idGenerator.generate('login_tabs', partial.id),
              type: 'tabs',
              title: '登录选项页签',
              body: [
                {
                  id: await idGenerator.generate('tab'),
                  type: 'tab',
                  title: '账号登录',
                  body: [
                    {
                      id: await idGenerator.generate('login_username', partial.id),
                      type: 'text',
                      placeholder: '手机号/邮箱/用户名',
                      title: '账号',
                      validators: [
                        {
                          type: 'required'
                        }
                      ]
                    },
                    {
                      id: await idGenerator.generate('login_password', partial.id),
                      type: 'text',
                      placeholder: '请输入用密码',
                      title: '密码',
                      validators: [
                        {
                          type: 'required'
                        }
                      ]
                    }
                  ]
                },
                {
                  id: await idGenerator.generate('tab'),
                  type: 'tab',
                  title: '扫描登录'
                }
              ]
            },
            {
              id: await idGenerator.generate('button'),
              type: 'button',
              title: '登录'
            },
            {
              id: await idGenerator.generate('text-button'),
              type: 'text-button',
              title: '没有账号，点我注册一个吧'
            }
          ]
        })
      });

      componentRegistry.registry({
        type: 'vedio-player',
        title: '视频播放器',
        group: 'other',
        fac: cfr.resolveComponentFactory(VedioPlayerComponent), metadataProvider: async (partial: PartialComponentMetadata) => ({
          vedioUrl: "https://www.runoob.com/try/demo_source/movie.ogg"
        })
      });
    }

    if (designPanelRegistry) {
      designPanelRegistry.registry({
        type: 'login',
        fac: cfr.resolveComponentFactory(LoginConfigurationComponent)
      });

      designPanelRegistry.registry({
        type: 'vedio-player',
        fac: cfr.resolveComponentFactory(VedioPlayerConfigurationComponent)
      });
    }
  }
}
