import { ChangeDetectorRef, ElementRef, InjectionToken, Injector, Renderer2 } from '@angular/core';
import { ComponentConfiguration } from '../../models';
import { LazyService, PropertyEntry } from '../../utils/common-decorator';

export interface ComponentDesignConfiguration extends ComponentConfiguration {

}

export const COMPONENT_DESIGN_CONFIGURATION: InjectionToken<ComponentDesignConfiguration> = new InjectionToken<ComponentDesignConfiguration>('component design configuration');

export abstract class ComponentDesignPanel {

  @PropertyEntry('configuration.id')
  public readonly id: string;
  @LazyService(COMPONENT_DESIGN_CONFIGURATION)
  public readonly configuration: ComponentDesignConfiguration;
  @LazyService(ElementRef)
  protected readonly el: ElementRef;
  @LazyService(Renderer2)
  protected readonly renderer: Renderer2;
  @LazyService(ChangeDetectorRef)
  protected readonly cdr: ChangeDetectorRef;
  protected onChangeFn: (val: any) => void;
  private actived: boolean = true;
  constructor(
    public injector: Injector
  ) { }

  registerOnChange(fn: (val: any) => void): void {
    this.onChangeFn = fn;
  }

}