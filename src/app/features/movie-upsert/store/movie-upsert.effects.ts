import { effect, inject, Injectable } from '@angular/core';
import { storageKeysConstant } from '@appConstants';
import { MovieDto } from '@appDTOs';
import { LoadingBarStore, ToastsService } from '@appLayout';
import { KinopoiskApiService, MoviesApiService } from '@appServices';

import { catchError, finalize, forkJoin, map, Observable, take, tap, throwError } from 'rxjs';

import { MovieUpsertStore } from './movie-upsert.store';

@Injectable({ providedIn: 'root' })
export class MovieUpsertEffects {
  #store = inject(MovieUpsertStore);
  #kpApiService = inject(KinopoiskApiService);
  #moviesApi = inject(MoviesApiService);
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

  loadDataFromKP(id: number): void {
    const getMovieDTO$ = this.#kpApiService.getMovieById(id);
    const getCoverImageUrl$ = this.#kpApiService.getMinimizedCoverURLImage(id);
    this.#store.update((state) => ({ ...state, loading: true }));
    forkJoin({ kinopoiskDTO: getMovieDTO$, cover: getCoverImageUrl$ })
      .pipe(
        take(1),
        map(({ kinopoiskDTO, cover }) => {
          kinopoiskDTO.poster.mini = cover;
          return { ...kinopoiskDTO };
        })
      )
      .subscribe({
        next: (kinopoiskDTO) => {
          this.#store.update((state) => ({ ...state, kinopoiskDTO, loading: false }));
          this.#toastService.show({
            type: 'success',
            translateKey: 'movie.notifications.loadedFromKP'
          });
        },
        error: () => {
          this.#store.update((state) => ({ ...state, loading: false }));
          this.#toastService.show({
            type: 'danger',
            translateKey: 'movie.notifications.loadingErrorFromKP'
          });
        }
      });
  }

  loadDataDB(id: string): void {
    this.#store.update((state) => ({ ...state, loading: true }));
    this.#moviesApi
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
      .subscribe((result) => this.#store.update((state) => ({ ...state, movieDTO: result, loading: false })));
  }

  updateMovie$(movie: MovieDto): Observable<void> {
    this.#store.update((state) => ({ ...state, loading: true }));
    return this.#moviesApi.updateMovie$(movie).pipe(
      tap(() => sessionStorage.removeItem(storageKeysConstant.MOVIES)),
      tap(() => {
        this.#toastService.show({
          type: 'success',
          translateKey: 'movie.notifications.updated'
        });
      }),
      catchError((err) => {
        this.#toastService.show({
          type: 'danger',
          translateKey: 'movie.notifications.updateError'
        });
        return throwError(err);
      }),
      finalize(() => this.#store.update((state) => ({ ...state, loading: false })))
    );
  }

  addMovie$(movie: MovieDto): Observable<unknown> {
    this.#store.update((state) => ({ ...state, loading: true }));
    return this.#moviesApi.addMovie$(movie).pipe(
      tap(() => sessionStorage.removeItem(storageKeysConstant.MOVIES)),
      tap((res) => {
        if (res) {
          this.#toastService.show({
            type: 'success',
            translateKey: 'movie.notifications.added'
          });
        } else {
          this.#toastService.show({
            type: 'danger',
            translateKey: 'movie.notifications.addError'
          });
        }
      }),
      finalize(() => this.#store.update((state) => ({ ...state, loading: false })))
    );
  }

  resetState(): void {
    this.#store.reset();
  }
}
