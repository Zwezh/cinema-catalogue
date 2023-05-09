import { TestBed } from '@angular/core/testing';

import { FireApiService } from './fire-api.service';

describe('FireApiService', () => {
  let service: FireApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
