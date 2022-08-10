import { TestBed } from '@angular/core/testing';

import { VictorCoreService } from './victor-core.service';

describe('VictorCoreService', () => {
  let service: VictorCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VictorCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
