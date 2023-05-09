import { TestBed } from '@angular/core/testing';

import { MoviesStateService } from './movies-state.service';

describe('MoviesStateService', () => {
  let service: MoviesStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
