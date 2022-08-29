import { TestBed } from '@angular/core/testing';

import { VictorRendererService } from './victor-renderer.service';

describe('VictorRendererService', () => {
  let service: VictorRendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VictorRendererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
