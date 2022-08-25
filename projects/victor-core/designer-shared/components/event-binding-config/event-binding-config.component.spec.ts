import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBindingConfigComponent } from './event-binding-config.component';

describe('EventBindingConfigComponent', () => {
  let component: EventBindingConfigComponent;
  let fixture: ComponentFixture<EventBindingConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventBindingConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventBindingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
