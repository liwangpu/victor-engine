import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAddingSettingComponent } from './event-adding-setting.component';

describe('EventAddingSettingComponent', () => {
  let component: EventAddingSettingComponent;
  let fixture: ComponentFixture<EventAddingSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAddingSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAddingSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
