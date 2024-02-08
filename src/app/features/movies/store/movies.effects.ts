import { inject, Injectable } from '@angular/core';
import { storageKeysConstant } from '@appConstants';
import { MovieDto } from '@appDTOs';
import { MovieModel } from '@appModels';
import { MoviesApiService } from '@appServices';

import { map, take, tap } from 'rxjs';

import { MoviesStore } from './movies.store';

import { SortingDirectionConstant, SortingKeyConstant, SortingType } from '../../actions-panel';
import { moviesFilterHelper, moviesSortingHelper } from '../helpers';
import { MoviesPageParamsType } from '../types';

@Injectable({ providedIn: 'root' })
export class MoviesEffects {
  #store = inject(MoviesStore);
  #apiService = inject(MoviesApiService);
  #sourceMovies: MovieModel[];

  loadAllMovies(): void {
    this.#updateStateByLoading(true);
    const cachedMovies = sessionStorage.getItem(storageKeysConstant.MOVIES);
    if (cachedMovies) {
      const movieList = this.#convertDtoListToModel(JSON.parse(cachedMovies) as MovieDto[]);
      this.#sourceMovies = [...movieList];
      this.#updateStateAfterLoad();
      this.#updateStateByLoading(false);
      return;
    }
    this.#apiService
      .getAllMovies$()
      .pipe(
        take(1),
        tap((movies: MovieDto[]) => sessionStorage.setItem(storageKeysConstant.MOVIES, JSON.stringify(movies))),
        map(this.#convertDtoListToModel),
        tap((movies: MovieModel[]) => (this.#sourceMovies = [...movies]))
      )
      .subscribe(this.#updateStateAfterLoad.bind(this));
  }

  setMovieListParams(params: MoviesPageParamsType): void {
    this.#store.update((state) =>
      params.resetState
        ? {
            ...state,
            currentPage: 0,
            movies: this.#getMoviesByParams(params),
            searchValue: params.search
          }
        : {
            ...state,
            movies: [...this.#store.state().movies],
            currentPage: params.page ? +params.page - 1 : 0
          }
    );
  }

  changeSortingKey(key: SortingKeyConstant): void {
    const direction = SortingDirectionConstant.desc;
    this.#changeSorting({ direction, key });
  }

  changeSortingDirection(): void {
    const direction = this.#getSortDirection();
    this.#changeSorting({ direction, key: this.#store.state().sorting.key });
  }

  #getMoviesByParams(params: MoviesPageParamsType): MovieModel[] {
    return this.#filterMovies(params.filters, this.#searchMovies(params.search));
  }

  #filterMovies(filters: string, movies: MovieModel[]): MovieModel[] {
    if (filters) {
      return movies.filter((movie: MovieModel) => moviesFilterHelper(movie, filters));
    }
    return [...movies];
  }

  #searchMovies(value: string): MovieModel[] {
    return value
      ? this.#sourceMovies.filter((item: MovieModel) => item?.name?.toLowerCase()?.includes(value.toLowerCase()))
      : [...this.#sourceMovies];
  }

  #updateStateAfterLoad(): void {
    const { currentPage: page, searchValue: search } = this.#store.state();
    this.setMovieListParams({ page: page.toString(), search, resetState: true });
    this.#updateStateByLoading(false);
  }

  #convertDtoListToModel(list: MovieDto[]): MovieModel[] {
    return list.map((movie: MovieDto) => new MovieModel(movie));
  }

  #updateStateByLoading(loading: boolean): void {
    this.#store.update((state) => ({ ...state, loading }));
  }

  #getSortDirection(): SortingDirectionConstant {
    return this.#store.state().sorting.direction === SortingDirectionConstant.desc
      ? SortingDirectionConstant.asc
      : SortingDirectionConstant.desc;
  }

  #changeSorting(sorting: SortingType): void {
    this.#store.update((state) => ({
      ...state,
      movies: moviesSortingHelper(state.movies, sorting),
      sorting
    }));
  }
}
