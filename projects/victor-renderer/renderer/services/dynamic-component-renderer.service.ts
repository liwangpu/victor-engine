import { ComponentRef, Inject, Injectable, Injector, Renderer2, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubSink } from 'subsink';
import { DynamicComponent, DynamicComponentMetadata, DynamicComponentRegistry, DynamicComponentRenderer, DYNAMIC_COMPONENT_METADATA, DYNAMIC_COMPONENT_REGISTRY, LazyService } from 'victor-core';
import { setComponentScope } from 'victor-renderer/state-store';

@Injectable()
export class DynamicComponentRendererService implements DynamicComponentRenderer {

  @LazyService(Store)
  private readonly store: Store;
  @LazyService(DYNAMIC_COMPONENT_REGISTRY)
  protected registry: DynamicComponentRegistry;
  constructor(
    protected injector: Injector
  ) {
  }

  async render(parent: Injector, metadata: DynamicComponentMetadata, container: ViewContainerRef): Promise<ComponentRef<DynamicComponent>> {
    const ij = Injector.create({
      providers: [
        { provide: DYNAMIC_COMPONENT_METADATA, useValue: metadata },
      ],
      parent
    });
    const des = await this.registry.getComponentDescription(metadata.type);
    const ref = container.createComponent(des.fac, null, ij);
    const nel: HTMLElement = ref.location.nativeElement;
    nel.classList.add('dynamic-component');
    // const { events, actions, scopes } = ref.instance['getMetaDataDescription']();
    const scopeChange = (scope: string, data: { value: any, source?: any }) => {
      // console.log(`${metadata.id} set scope:`, scope, data);
      this.store.dispatch(setComponentScope({ id: metadata.id, title: ref.instance.title, scopeName: scope, scopeValue: data, source: DynamicComponentRendererService.name }));
    };
    ref.instance['registryScopeChangeFn'](scopeChange);
    return ref;
  }
}
