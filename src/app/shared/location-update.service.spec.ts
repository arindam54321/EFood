import { TestBed } from '@angular/core/testing';

import { LocationUpdateService } from './location-update.service';

describe('LocationUpdateService', () => {
  let service: LocationUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
