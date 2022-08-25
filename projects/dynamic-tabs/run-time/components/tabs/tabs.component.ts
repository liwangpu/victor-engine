import { Component, OnInit, ChangeDetectionStrategy, Injector, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ComponentAction, ComponentEvent, DynamicComponent, ComponentConfiguration, LazyService, PropertyEntry } from 'victor-core';

@Component({
  selector: 'victor-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent extends DynamicComponent implements OnInit {

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
    // this.id = `${+new Date()}`;
    // console.log('tabs:', this.tabs);
    // console.log('tabs:', this.tabs);
  }

  @ComponentAction('激活面板')
  activeTab(id: string): void {
    this.selectedTabIndex = this.tabs.findIndex(t => t.id === id);
    this.cdr.markForCheck();
  }

  onSelectedTabIndexChange(index: number) {
    this.tabChange.next(this.tabs[index].id);
  }

  trackById(index: number, it: ComponentConfiguration): any {
    return it.id;
  }

}
