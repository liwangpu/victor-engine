import { TestBed } from '@angular/core/testing';

import { VictorEditorService } from './victor-editor.service';

describe('VictorEditorService', () => {
  let service: VictorEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VictorEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
