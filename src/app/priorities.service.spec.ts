import { TestBed } from '@angular/core/testing';

import { PrioritiesService } from './priorities.service';

describe('PrioritiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrioritiesService = TestBed.get(PrioritiesService);
    expect(service).toBeTruthy();
  });
});
