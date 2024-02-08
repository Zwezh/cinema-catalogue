import { TestBed } from '@angular/core/testing';

import { MoviesStore } from './movies.store';

describe(MoviesStore.name, () => {
  let service: MoviesStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
