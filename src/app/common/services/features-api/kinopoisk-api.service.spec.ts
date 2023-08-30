import { TestBed } from '@angular/core/testing';

import { KinopoiskApiService } from './kinopoisk-api.service';

describe('KinopoiskApiService', () => {
  let service: KinopoiskApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KinopoiskApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
