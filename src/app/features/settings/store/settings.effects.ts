import { effect, inject, Injectable } from '@angular/core';
import { storageKeysConstant } from '@appConstants';
import { SettingsDto } from '@appDTOs';
import { LoadingBarStore, ToastsService } from '@appLayout';
import { SettingsApiService } from '@appServices';

import { catchError, filter, take, tap, throwError } from 'rxjs';

import { SettingsStore } from './settings.store';

@Injectable({ providedIn: 'root' })
export class SettingsEffects {
  #store = inject(SettingsStore);
  #apiService = inject(SettingsApiService);
  #toastService = inject(ToastsService);
  #loadingBarStore = inject(LoadingBarStore);

  constructor() {
    effect(
      () => {
        const loading = this.#store.select(({ loading }) => loading);
        if (typeof loading() === 'boolean') {
          if (this.#store.state().loading) {
            this.#loadingBarStore.show();
          } else {
            this.#loadingBarStore.hide();
          }
        }
      },
      { allowSignalWrites: true }
    );
  }

  load(): void {
    this.#store.update((state) => ({ ...state, loading: true }));
    this.#apiService
      .getSettings$()
      .pipe(
        take(1),
        tap((res) => {
          if (res) {
            this.#toastService.show({
              type: 'success',
              translateKey: 'settings.notifications.loaded'
            });
          } else {
            this.#toastService.show({
              type: 'danger',
              translateKey: 'settings.notifications.loadingError'
            });
          }
        }),
        filter(Boolean),
        tap((settings: SettingsDto) => {
          sessionStorage.setItem(storageKeysConstant.SETTINGS, JSON.stringify(settings));
        })
      )
      .subscribe({
        next: (settings: SettingsDto) => this.#store.update((state) => ({ ...state, settings })),
        complete: () => this.#store.update((state) => ({ ...state, loading: false }))
      });
  }

  update(settings: SettingsDto): void {
    this.#store.update((state) => ({ ...state, loading: true }));
    this.#apiService
      .updateSettings$(settings)
      .pipe(
        take(1),
        tap(() => this.#store.update((state) => ({ ...state, settings, loading: false }))),
        tap(() => sessionStorage.setItem(storageKeysConstant.SETTINGS, JSON.stringify(settings))),
        tap(() =>
          this.#toastService.show({
            type: 'success',
            translateKey: 'settings.notifications.updated'
          })
        ),
        catchError((err) => {
          this.#toastService.show({
            type: 'danger',
            translateKey: 'settings.notifications.updateError'
          });
          this.#store.update((state) => ({ ...state, loading: false }));
          return throwError(err);
        })
      )
      .subscribe();
  }
}
