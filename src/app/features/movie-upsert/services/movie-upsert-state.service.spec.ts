import { TestBed } from '@angular/core/testing';

import { MovieUpsertStateService } from './movie-upsert-state.service';

describe('MovieUpsertStateService', () => {
  let service: MovieUpsertStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieUpsertStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
