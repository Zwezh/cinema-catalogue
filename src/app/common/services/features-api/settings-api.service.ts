import { Inject, Injectable } from '@angular/core';
import { SettingsDto } from '@appDTOs';
import { Environment } from '@appModels';
import { FireApiService } from '@appServices';
import { ENVIRONMENT } from '@appTokens';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsApiService extends FireApiService {
  #settingsId: string;

  constructor(@Inject(ENVIRONMENT) environment: Environment) {
    super('settings');
    this.#settingsId = environment.settingsId;
  }

  getSettings$(): Observable<SettingsDto> {
    return this.getById$<SettingsDto>(this.#settingsId);
  }

  updateSettings$(dto: SettingsDto): Observable<void> {
    return this.update$<SettingsDto>(dto);
  }
}
