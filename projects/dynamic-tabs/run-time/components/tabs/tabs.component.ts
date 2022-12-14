import { Component, OnInit, ChangeDetectionStrategy, Injector, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ComponentAction, ComponentEvent, DynamicComponent, ComponentConfiguration, LazyService, PropertyEntry, InitialConfigurationProvider, IHasInitialConfiguration, PartialComponentConfiguration, ComponentIdGenerator } from 'victor-core';

@Component({
  selector: 'victor-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent extends DynamicComponent implements OnInit, InitialConfigurationProvider<IHasInitialConfiguration, typeof TabsComponent> {

  selectedTabIndex: number = 0;
  @PropertyEntry('configuration.body')
  tabs: ComponentConfiguration[];
  @Output()
  @ComponentEvent()
  tabChange = new EventEmitter<string>();
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {

  }

  @ComponentAction('激活面板')
  activeTab(idOrIndex: string): void {
    this.selectedTabIndex = this.tabs.findIndex(t => t.id === idOrIndex);
    if (this.selectedTabIndex < 0) {
      const idx = Number.parseInt(idOrIndex);
      if (!isNaN(idx)) {
        this.selectedTabIndex = idx;
      }
    }
    this.cdr.markForCheck();
  }

  onSelectedTabIndexChange(index: number) {
    this.tabChange.next(this.tabs[index].id);
  }

  trackById(index: number, it: ComponentConfiguration): any {
    return it.id;
  }

  static async configurationProvider(partial: PartialComponentConfiguration, context: { injector: Injector, idGenerator: ComponentIdGenerator }): Promise<PartialComponentConfiguration> {
    return {
      body: [
        {
          id: await context.idGenerator.generate('tab', partial.id),
          type: 'tab',
          title: '页签1'
        }
      ]
    };
  }

}
