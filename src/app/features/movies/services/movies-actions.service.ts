import { inject, Injectable } from '@angular/core';
import { storageKeysConstant } from '@appConstants';
import { MovieDto } from '@appDTOs';
import { MovieModel } from '@appModels';
import { MoviesApiService } from '@appServices';

import { map, take, tap } from 'rxjs';

import { MoviesStateService } from './movies-state.service';

import { moviesFilterHelper } from '../helpers';
import { MoviesPageParamsType, MoviesState } from '../types';

@Injectable({
  providedIn: 'root'
})
export class MoviesActionsService {
  #apiService = inject(MoviesApiService);
  #stateService = inject(MoviesStateService);
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
    const state: MoviesState = params.resetState
      ? {
          ...this.#stateService.state,
          currentPage: 0,
          movies: this.#getMoviesByParams(params),
          searchValue: params.search
        }
      : {
          ...this.#stateService.state,
          movies: [...this.#stateService.state.movies],
          currentPage: params.page ? +params.page - 1 : 0
        };
    this.#stateService.setState(state);
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
    const { currentPage: page, searchValue: search } = this.#stateService.state;
    this.setMovieListParams({ page: page.toString(), search, resetState: true });
    this.#updateStateByLoading(false);
  }

  #convertDtoListToModel(list: MovieDto[]): MovieModel[] {
    return list.map((movie: MovieDto) => new MovieModel(movie));
  }

  #updateStateByLoading(loading: boolean): void {
    this.#stateService.setState({ ...this.#stateService.state, loading });
  }
}
