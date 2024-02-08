import { Injectable } from '@angular/core';
import { BaseStore } from '@appStore';

import { SETTINGS_INITIAL_STATE } from '../constants';
import { SettingsState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SettingsStore extends BaseStore<SettingsState> {
  constructor() {
    super(SETTINGS_INITIAL_STATE);
  }
}
