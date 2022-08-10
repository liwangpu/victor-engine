import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VictorEditorComponent } from './victor-editor.component';

describe('VictorEditorComponent', () => {
  let component: VictorEditorComponent;
  let fixture: ComponentFixture<VictorEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VictorEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VictorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
