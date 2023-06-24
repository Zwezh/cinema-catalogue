import { TestBed } from '@angular/core/testing';

import { MovieUpsertActionsService } from './movie-upsert-actions.service';

describe('MovieUpsertActionsService', () => {
  let service: MovieUpsertActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieUpsertActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
