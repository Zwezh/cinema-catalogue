import { TestBed } from '@angular/core/testing';

import { MovieDetailsStateService } from './movie-details-state.service';

describe('MovieDetailsStateService', () => {
  let service: MovieDetailsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieDetailsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
