import { effect, inject, Injectable } from '@angular/core';
import { MovieDto } from '@appDTOs';
import { LoadingBarStore, ToastsService } from '@appLayout';
import { MovieModel } from '@appModels';
import { MoviesApiService } from '@appServices';

import { catchError, Observable, take, tap, throwError } from 'rxjs';

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
        tap(() => this.#toastService.show({ type: 'success', translateKey: 'movie.notifications.loaded' }))
      )
      .subscribe({
        next: (response) => this.#updateStateAfterLoadMovie(response),
        error: () => this.#toastService.show({ type: 'danger', translateKey: 'movie.notifications.loadingError' })
      });
  }

  resetState(): void {
    this.#store.reset();
  }

  deleteMovie$(id: string): Observable<unknown> {
    this.#store.update((state) => ({ ...state, loading: true }));
    return this.#apiService.deleteMovie$(id).pipe(
      tap(() => this.#store.update((state) => ({ ...state, loading: false }))),
      tap(() => this.#toastService.show({ type: 'success', translateKey: 'movie.notifications.deleted' })),
      catchError((error) => {
        this.#toastService.show({ type: 'danger', translateKey: 'movie.notifications.deleteError' });
        return throwError(() => error);
      })
    );
  }

  #updateStateAfterLoadMovie(movie: MovieDto): void {
    this.#store.update((state) => ({ ...state, movie: new MovieModel(movie), loading: false }));
  }
}
