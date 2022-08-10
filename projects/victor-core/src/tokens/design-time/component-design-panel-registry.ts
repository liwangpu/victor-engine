import { ChangeDetectorRef, ComponentFactory, ElementRef, InjectionToken, Injector, Renderer2 } from '@angular/core';
import { LazyService, PropertyEntry } from '../../utils/common-decorator';

export interface ComponentDesignConfiguration {
  id: string;
  type: string;
  config?: { [key: string]: any };
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

export interface ComponentDesignPanelDescription {
  type: string;
  fac: ComponentFactory<ComponentDesignPanel>;
}

export interface ComponentDesignPanelRegistry {
  registry(des: ComponentDesignPanelDescription): void;
  getComponentDescription(type: string): Promise<ComponentDesignPanelDescription>;
  getComponentDescriptions(): Promise<Array<ComponentDesignPanelDescription>>;
}

export const COMPONENT_DESIGN_PANEL_REGISTRY: InjectionToken<ComponentDesignPanelRegistry> = new InjectionToken<ComponentDesignPanelRegistry>('component design panel registry');