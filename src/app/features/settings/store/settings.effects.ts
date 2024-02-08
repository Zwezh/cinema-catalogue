import { inject, Injectable } from '@angular/core';
import { storageKeysConstant } from '@appConstants';
import { SettingsDto } from '@appDTOs';
import { SettingsApiService } from '@appServices';

import { catchError, take, tap, throwError } from 'rxjs';

import { SettingsStore } from './settings.store';

@Injectable({ providedIn: 'root' })
export class SettingsEffects {
  #store = inject(SettingsStore);
  #apiService = inject(SettingsApiService);
  constructor() {}

  load(): void {
    this.#store.update((state) => ({ ...state, loading: true }));
    this.#apiService
      .getSettings$()
      .pipe(
        take(1),
        tap((settings: SettingsDto) => sessionStorage.setItem(storageKeysConstant.SETTINGS, JSON.stringify(settings)))
      )
      .subscribe((result: SettingsDto) =>
        this.#store.update((state) => ({ ...state, settings: result, loading: false }))
      );
  }

  update(settings: SettingsDto): void {
    this.#store.update((state) => ({ ...state, loading: true }));
    this.#apiService
      .updateSettings$(settings)
      .pipe(
        take(1),
        tap(() => this.#store.update((state) => ({ ...state, settings, loading: false }))),
        tap(() => sessionStorage.setItem(storageKeysConstant.SETTINGS, JSON.stringify(settings))),
        catchError((err) => {
          this.#store.update((state) => ({ ...state, loading: false }));
          return throwError(err);
        })
      )
      .subscribe();
  }
}
