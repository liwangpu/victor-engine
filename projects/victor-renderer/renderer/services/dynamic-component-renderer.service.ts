import { ComponentRef, Injectable, Injector, OnDestroy, ViewContainerRef } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, first, skip } from 'rxjs/operators';
import { SubSink } from 'subsink';
import * as _ from 'lodash';
import { ComponentDescription, ComponentMetadataDescription, DynamicComponent, DynamicComponentMetadata, DynamicComponentRegistry, DynamicComponentRenderer, DYNAMIC_COMPONENT_METADATA, DYNAMIC_COMPONENT_REGISTRY, DYNAMIC_PAGE_ID, LazyService, DynamicValidator, DYNAMIC_VALIDATOR, IHasValidator } from 'victor-core';
import { setComponentMetadata, setComponentScope, selectVictorRendererState, selectComonentValidatedErrors } from 'victor-renderer/state-store';
import { setComponentValidatedError } from 'victor-renderer/state-store/component-validated-error';

@Injectable()
export class DynamicComponentRendererService implements DynamicComponentRenderer, OnDestroy {

  @LazyService(Store)
  private readonly store: Store;
  @LazyService(Actions)
  private readonly actions$: Actions;
  @LazyService(DYNAMIC_COMPONENT_REGISTRY)
  private readonly registry: DynamicComponentRegistry;
  @LazyService(DYNAMIC_VALIDATOR, [])
  private readonly validators: DynamicValidator[];
  private validatorMap: Map<string, DynamicValidator>;
  private readonly subs = new SubSink();
  constructor(
    protected injector: Injector
  ) {
    // console.log(`validators:`, this.validators);
    // 订阅数据变更,触发校验/联动等
    this.subs.sink = this.actions$
      .pipe(ofType(setComponentScope))
      .pipe(delay(80))
      .subscribe(async act => {
        const state = await this.store.select(selectVictorRendererState).pipe(first()).toPromise();
        const metadata: DynamicComponentMetadata = state.componentMetadatas[act.id];
        const description: ComponentMetadataDescription = state.componentDescriptions[act.id];
        // console.log(`state:`, state);
        // console.log(`act:`, act);
        // console.log(`metadata:`, metadata);
        // await this.validateScope(act);
        // 生成三段权重校验类型映射
        if (!this.validatorMap) {
          this.validatorMap = new Map();
          this.validators.forEach(it => {
            let key = '';
            if (it.componentId) {
              key += `${it.componentId}@`;
            }

            if (it.componentType) {
              key += `${it.componentType}@`;
            }

            if (it.validatorType) {
              key += `${it.validatorType}`;
            }

            this.validatorMap.set(key, it);
          });
        }
        const validatorRules = metadata.validators || [];
        // 触发校验
        if (this.validatorMap.size && validatorRules.length) {
          const errors: { [scopeName: string]: string } = {};
          for (let rule of validatorRules) {
            let validator: DynamicValidator;
            const firstStepValidatorKey: string = `${act.id}@${act.componentType}@${rule.type}`;
            if (this.validatorMap.has(firstStepValidatorKey)) {
              validator = this.validatorMap.get(firstStepValidatorKey);
            }

            if (!validator) {
              const secondStepValidatorKey: string = `${act.componentType}@${rule.type}`;
              if (this.validatorMap.has(secondStepValidatorKey)) {
                validator = this.validatorMap.get(secondStepValidatorKey);
              }
            }

            if (!validator) {
              const thirdStepValidatorKey: string = `${rule.type}`;
              if (this.validatorMap.has(thirdStepValidatorKey)) {
                validator = this.validatorMap.get(thirdStepValidatorKey);
              }
            }

            if (validator) {
              const error = await validator.validate(rule, { scopeName: act.scopeName, scopeValue: act.scopeValue, scopeSource: act.scopeSource }, { pageId: act.pageId, metadata, description });
              if (error) {
                errors[act.scopeName] = error;
                break;
              }
            }
          }
          this.store.dispatch(setComponentValidatedError({ id: act.id, errors, source: DynamicComponentRendererService.name }));
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async render(parent: Injector, metadata: DynamicComponentMetadata, container: ViewContainerRef): Promise<ComponentRef<DynamicComponent>> {
    const ij = Injector.create({
      providers: [
        { provide: DYNAMIC_COMPONENT_METADATA, useValue: metadata },
      ],
      parent
    });
    const pageId = parent.get(DYNAMIC_PAGE_ID);
    const des = await this.registry.getComponentDescription(metadata.type);
    if (!des) { return null; }
    const ref = container.createComponent(des.fac, null, ij);
    const nel: HTMLElement = ref.location.nativeElement;
    nel.classList.add('dynamic-component');
    const description = ref.instance['getMetaDataDescription']();
    // console.log(`des:`, description);
    this.store.dispatch(setComponentMetadata({ id: metadata.id, metadata, description, source: DynamicComponentRendererService.name }));
    const subs = new SubSink();
    // 如果有scope 订阅数据变更
    if (description.scopes?.length) {
      const scopeChange$ = new Subject<{ scope: string, data: { value: any, source?: any } }>();
      const scopeChange = (scope: string, data: { value: any, source?: any }) => {
        scopeChange$.next({ scope, data });
      };
      ref.instance['registryScopeChangeFn'](scopeChange);

      subs.sink = scopeChange$
        .pipe(debounceTime(120))
        .subscribe(({ scope, data }) => {
          this.store.dispatch(setComponentScope({ pageId, id: metadata.id, title: ref.instance.title, componentType: metadata.type, scopeName: scope, scopeValue: data.value, scopeSource: data.source, source: DynamicComponentRendererService.name }));
        });

      subs.sink = this.store.select(selectComonentValidatedErrors(metadata.id))
        .pipe(distinctUntilChanged(_.isEqual), skip(1))
        .subscribe(errors => {
          // console.log(`eeee:`, errors);
          const implementHasError = typeof <IHasValidator>(ref.instance as any).onValidatedChange === 'function';
          if (implementHasError) {
            <IHasValidator>(ref.instance as any).onValidatedChange(errors);
          }
        });
    }

    ref.onDestroy(() => {
      subs.unsubscribe();

    });
    return ref;
  }

}
