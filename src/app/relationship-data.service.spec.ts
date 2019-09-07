import { TestBed } from '@angular/core/testing';

import { RelationshipDataService } from './relationship-data.service';

describe('RelationshipDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelationshipDataService = TestBed.get(RelationshipDataService);
    expect(service).toBeTruthy();
  });
});
