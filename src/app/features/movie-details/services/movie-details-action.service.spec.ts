import { TestBed } from '@angular/core/testing';

import { MovieDetailsActionService } from './movie-details-action.service';

describe('MovieDetailsActionService', () => {
  let service: MovieDetailsActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieDetailsActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
