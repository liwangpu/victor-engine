import { ComponentRef, Inject, Injectable, Injector, Renderer2, ViewContainerRef } from '@angular/core';
import { SubSink } from 'subsink';
import { DynamicComponent, DynamicComponentMetadata, DynamicComponentRegistry, DynamicComponentRenderer, DYNAMIC_COMPONENT_METADATA, DYNAMIC_COMPONENT_REGISTRY } from 'victor-core';
import { DynamicComponentRendererService as BaseDynamicComponentRendererService } from 'victor-core/registration';

@Injectable()
export class DynamicComponentRendererService extends BaseDynamicComponentRendererService {

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  async render(parent: Injector, metadata: DynamicComponentMetadata, container: ViewContainerRef): Promise<ComponentRef<DynamicComponent>> {
    const ref = await super.render(parent, metadata, container);
    const { events, actions, scopes } = ref.instance['getMetaDataDescription']();
    // console.log('scopes:', scopes);
    const scopeChange = (scope: string, value: any) => {
      console.log('scope:', value);
    };
    ref.instance['registryScopeChangeFn'](scopeChange);
    // const subs = new SubSink();
    // // console.log('events:', events);
    // ref.onDestroy(() => {
    //   subs.unsubscribe();
    // });
    return ref;
  }
}
