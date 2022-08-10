import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VictorRendererComponent } from './victor-renderer.component';

describe('VictorRendererComponent', () => {
  let component: VictorRendererComponent;
  let fixture: ComponentFixture<VictorRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VictorRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VictorRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
