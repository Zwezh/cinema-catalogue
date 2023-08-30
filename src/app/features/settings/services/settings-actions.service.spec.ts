import { TestBed } from '@angular/core/testing';

import { SettingsActionsService } from './settings-actions.service';

describe('MovieUpsertActionsService', () => {
  let service: SettingsActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
