import { Injectable } from '@angular/core';
import { BaseStateService } from '@appServices';

import { SETTINGS_INITIAL_STATE } from '../constants';
import { SettingsState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SettingsStateService extends BaseStateService<SettingsState> {
  constructor() {
    super(SETTINGS_INITIAL_STATE);
  }
}
