import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropItemWrapperComponent } from './drop-item-wrapper.component';

describe('DropItemWrapperComponent', () => {
  let component: DropItemWrapperComponent;
  let fixture: ComponentFixture<DropItemWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropItemWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropItemWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
