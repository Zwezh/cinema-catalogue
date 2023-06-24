import { TestBed } from '@angular/core/testing';

import { MoviesActionsService } from './movies-actions.service';

describe('MoviesActionsService', () => {
  let service: MoviesActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
