import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentSizeConfigComponent } from './component-size-config.component';

describe('ComponentSizeConfigComponent', () => {
  let component: ComponentSizeConfigComponent;
  let fixture: ComponentFixture<ComponentSizeConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentSizeConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentSizeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
