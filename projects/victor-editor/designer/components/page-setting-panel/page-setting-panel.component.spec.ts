import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSettingPanelComponent } from './page-setting-panel.component';

describe('PageSettingPanelComponent', () => {
  let component: PageSettingPanelComponent;
  let fixture: ComponentFixture<PageSettingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSettingPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSettingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
