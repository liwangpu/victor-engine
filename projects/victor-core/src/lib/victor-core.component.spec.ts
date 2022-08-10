import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VictorCoreComponent } from './victor-core.component';

describe('VictorCoreComponent', () => {
  let component: VictorCoreComponent;
  let fixture: ComponentFixture<VictorCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VictorCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VictorCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
