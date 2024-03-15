import { Injectable } from '@angular/core';
import { SettingsDto } from '@appDTOs';

import { Observable } from 'rxjs';

import { BaseApiService } from './base-api.service';

@Injectable({ providedIn: 'root' })
export class SettingsApiService extends BaseApiService {
  constructor() {
    super('settings');
  }

  getSettings$(): Observable<SettingsDto> {
    return this.httpClient.get<SettingsDto>(this.url);
  }

  updateSettings$(settingsDto: SettingsDto): Observable<SettingsDto> {
    return this.httpClient.put<SettingsDto>(this.url, settingsDto);
  }
}
