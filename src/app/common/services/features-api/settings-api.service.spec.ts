import { TestBed } from '@angular/core/testing';

import { SettingsApiService } from './settings-api.service';

describe('MoviesApiService', () => {
  let service: SettingsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
