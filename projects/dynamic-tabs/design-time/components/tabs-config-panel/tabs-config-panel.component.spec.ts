import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsConfigPanelComponent } from './tabs-config-panel.component';

describe('TabsConfigPanelComponent', () => {
  let component: TabsConfigPanelComponent;
  let fixture: ComponentFixture<TabsConfigPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsConfigPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsConfigPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
