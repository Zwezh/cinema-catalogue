import { effect, inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { MovieDto, MovieListDto } from '@appDTOs';
import { LoadingBarStore, ToastsService } from '@appLayout';
import { MovieModel } from '@appModels';
import { MoviesApiService } from '@appServices';

import { take } from 'rxjs';

import { MoviesStore } from './movies.store';

import { buildMoviesParamsUtil } from '../utils';

@Injectable({ providedIn: 'root' })
export class MoviesEffects {
  #store = inject(MoviesStore);
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

  loadAllMovies(params: Params): void {
    this.#apiService
      .getAllMovies$(buildMoviesParamsUtil(params))
      .pipe(take(1))
      .subscribe({
        next: ({ list, totalCount, currentPage }: MovieListDto) => {
          this.#toastService.show({ type: 'success', translateKey: 'movies.successfulLoaded' });
          const movies = this.#convertDtoListToModel(list);
          this.#store.update((state) => ({ ...state, movies, currentPage: +currentPage, totalCount, loading: false }));
        },
        error: () => {
          this.#toastService.show({ type: 'danger', translateKey: 'movies.loadedWithErrors' });
          this.#store.update((state) => ({ ...state, loading: false }));
        }
      });
  }

  #convertDtoListToModel(list: MovieDto[]): MovieModel[] {
    return list.map((movie: MovieDto) => new MovieModel(movie));
  }
}
