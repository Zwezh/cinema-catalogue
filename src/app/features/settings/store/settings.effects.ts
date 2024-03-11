import { effect, inject, Injectable } from '@angular/core';
import { SettingsDto } from '@appDTOs';
import { LoadingBarStore, ToastsService } from '@appLayout';
import { MoviesApiService, SettingsApiService } from '@appServices';

import { catchError, filter, take, tap, throwError } from 'rxjs';

import { SettingsStore } from './settings.store';

@Injectable({ providedIn: 'root' })
export class SettingsEffects {
  #store = inject(SettingsStore);
  #apiService = inject(SettingsApiService);
  #moviesApiService = inject(MoviesApiService);
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
      .getSettigns$()
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
        filter(Boolean)
      )
      .subscribe({
        next: (settings: SettingsDto) => this.#store.update((state) => ({ ...state, settings })),
        complete: () => this.#store.update((state) => ({ ...state, loading: false }))
      });
  }

  loadGenres(): void {
    this.#store.update((state) => ({ ...state, loading: true }));
    this.#moviesApiService
      .getMovieGenres$()
      .pipe(take(1), filter(Boolean))
      .subscribe({
        next: (movieGenres: string[]) => {
          this.#store.update((state) => ({ ...state, movieGenres }));
          this.#toastService.show({
            type: 'success',
            translateKey: 'settings.notifications.loaded'
          });
        },
        error: () => {
          this.#toastService.show({
            type: 'danger',
            translateKey: 'settings.notifications.loadingError'
          });
        },
        complete: () => this.#store.update((state) => ({ ...state, loading: false }))
      });
  }

  update(value: SettingsDto): void {
    this.#store.update((state) => ({ ...state, loading: true }));
    this.#apiService
      .updateSettings$(value)
      .pipe(
        take(1),
        tap((settings: SettingsDto) => this.#store.update((state) => ({ ...state, settings, loading: false }))),
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
