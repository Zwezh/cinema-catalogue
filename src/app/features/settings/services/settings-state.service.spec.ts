import { TestBed } from '@angular/core/testing';

import { SettingsStateService } from './settings-state.service';

describe('MovieUpsertStateService', () => {
  let service: SettingsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
