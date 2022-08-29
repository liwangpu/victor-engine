import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextConfigPanelComponent } from './text-config-panel.component';

describe('TextConfigPanelComponent', () => {
  let component: TextConfigPanelComponent;
  let fixture: ComponentFixture<TextConfigPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextConfigPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextConfigPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
