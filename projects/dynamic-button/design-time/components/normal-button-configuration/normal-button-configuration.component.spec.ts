import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalButtonConfigurationComponent } from './normal-button-configuration.component';

describe('NormalButtonConfigurationComponent', () => {
  let component: NormalButtonConfigurationComponent;
  let fixture: ComponentFixture<NormalButtonConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalButtonConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalButtonConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
