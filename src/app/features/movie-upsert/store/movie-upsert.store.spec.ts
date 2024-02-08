import { TestBed } from '@angular/core/testing';

import { MovieUpsertStore } from './movie-upsert.store';

describe(MovieUpsertStore.name, () => {
  let service: MovieUpsertStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieUpsertStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
