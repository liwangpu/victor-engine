import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsSettingComponent } from './tabs-setting.component';

describe('TabsSettingComponent', () => {
  let component: TabsSettingComponent;
  let fixture: ComponentFixture<TabsSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
