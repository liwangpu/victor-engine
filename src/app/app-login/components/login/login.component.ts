import { Component, OnInit, ChangeDetectionStrategy, Injector, OnDestroy, ChangeDetectorRef, ViewChild, ViewContainerRef, Optional, Inject } from '@angular/core';
import { SubSink } from 'subsink';
import { ComponentAction, ComponentConfiguration, COMPONENT_CONFIGURATION, CustomRenderProvider, CUSTOM_RENDER_PROVIDER, DynamicComponent, DynamicComponentRenderer, DYNAMIC_COMPONENT_RENDERER, LazyService, PropertyEntry } from 'victor-core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends DynamicComponent implements OnInit, OnDestroy {

  @PropertyEntry('configuration.logoUrl')
  logoUrl: string;
  @PropertyEntry('configuration.companyInfoUrl')
  companyInfoUrl: string;
  @ViewChild('container', { static: true, read: ViewContainerRef })
  private readonly container: ViewContainerRef;
  @LazyService(DYNAMIC_COMPONENT_RENDERER)
  private readonly componentRenderer: DynamicComponentRenderer;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  private readonly subs = new SubSink();
  constructor(
    @Optional()
    @Inject(CUSTOM_RENDER_PROVIDER)
    protected customRenderProvider: CustomRenderProvider,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  async ngOnInit(): Promise<void> {
    // console.log(`cfg:`, this.configuration);
    if (this.customRenderProvider) {
      const fac = await this.customRenderProvider.getRenderFactory(this.configuration);
      const ij = Injector.create({
        providers: [
          { provide: COMPONENT_CONFIGURATION, useValue: this.configuration },
        ],
        parent: this.injector
      });
      this.container.createComponent(fac, null, ij);
      this.cdr.markForCheck();
      return;
    }
    const body: ComponentConfiguration[] = this.configuration.body || [];
    if (body.length) {
      for (let md of body) {
        await this.componentRenderer.render(this.injector, md, this.container);
      }
    }
    this.cdr.markForCheck();
  }

  @ComponentAction('登录')
  async login(): Promise<void> {
    alert(`你点登录啦`);
  }


  @ComponentAction('注册')
  async registry(): Promise<void> {
    alert(`你点注册啦`);
  }

}
