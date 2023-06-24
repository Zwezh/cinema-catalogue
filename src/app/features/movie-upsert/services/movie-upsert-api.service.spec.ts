import { TestBed } from '@angular/core/testing';

import { MovieUpsertApiService } from './movie-upsert-api.service';

describe('MovieUpsertApiService', () => {
  let service: MovieUpsertApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieUpsertApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
