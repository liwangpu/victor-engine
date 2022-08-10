import { Component, OnInit, ChangeDetectionStrategy, Injector, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ComponentEvent, DynamicComponent, DynamicComponentMetadata, LazyService, PropertyEntry } from 'victor-core';

@Component({
  selector: 'victor-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent extends DynamicComponent implements OnInit {

  selectedTabIndex: number = 0;
  @PropertyEntry('metadata.body')
  tabs: DynamicComponentMetadata[];
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
    // console.log('tabs metadata:', this.metadata);
    // console.log('tabs:', this.tabs);
  }

  activeTab(id: string): void {
    this.selectedTabIndex = this.tabs.findIndex(t => t.id === id);
    this.cdr.markForCheck();
  }

  onSelectedTabIndexChange(index: number) {
    this.tabChange.next(this.tabs[index].id);
  }

  trackById(index: number, it: DynamicComponentMetadata): any {
    return it.id;
  }

}
