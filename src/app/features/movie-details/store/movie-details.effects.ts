import { effect, inject, Injectable } from '@angular/core';
import { MovieDto } from '@appDTOs';
import { LoadingBarStore, ToastsService } from '@appLayout';
import { MovieModel } from '@appModels';
import { MoviesApiService } from '@appServices';

import { Observable, take, tap } from 'rxjs';

import { MovieDetailsStore } from './movie-details.store';

@Injectable({ providedIn: 'root' })
export class MovieDetailsEffects {
  #store = inject(MovieDetailsStore);
  #apiService = inject(MoviesApiService);
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

  loadMovieById(id: string): void {
    this.#store.update((state) => ({ ...state, loading: true }));
    this.#apiService
      .getMovieById$(id)
      .pipe(
        take(1),
        tap((res) => {
          if (res) {
            this.#toastService.show({
              type: 'success',
              translateKey: 'movie.notifications.loaded'
            });
          } else {
            this.#toastService.show({
              type: 'danger',
              translateKey: 'movie.notifications.loadingError'
            });
          }
        })
      )
      .subscribe(this.#updateStateAfterLoadMovie.bind(this));
  }

  resetState(): void {
    this.#store.reset();
  }

  deleteMovie$(id: string): Observable<unknown> {
    this.#store.update((state) => ({ ...state, loading: true }));
    return this.#apiService.deleteMovie$(id).pipe(
      tap(() => this.#store.update((state) => ({ ...state, loading: false }))),
      tap((res) => {
        if (res) {
          this.#toastService.show({
            type: 'success',
            translateKey: 'movie.notifications.deleted'
          });
        } else {
          this.#toastService.show({
            type: 'danger',
            translateKey: 'movie.notifications.deleteError'
          });
        }
      })
    );
  }

  #updateStateAfterLoadMovie(movie: MovieDto): void {
    this.#store.update((state) => ({ ...state, movie: new MovieModel(movie), loading: false }));
  }
}
