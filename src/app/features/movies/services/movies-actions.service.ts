import { inject, Injectable } from '@angular/core';
import { storageKeysConstant } from '@appConstants';
import { MovieDto } from '@appDTOs';
import { MovieModel } from '@appModels';
import { MoviesApiService } from '@appServices';

import { map, take, tap } from 'rxjs';

import { MoviesStateService } from './movies-state.service';

import { MoviesPageParams, MoviesState } from '../models';

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

  setMovieListParams(params: MoviesPageParams): void {
    const state: MoviesState = {
      ...this.#stateService.state,
      currentPage: params.page ? +params.page - 1 : 0,
      movies: this.searchMovies(params.search),
      searchValue: params.search
    };
    this.#stateService.setState(state);
  }

  searchMovies(value: string): MovieModel[] {
    return value
      ? this.#sourceMovies.filter((item: MovieModel) => item?.name?.toLowerCase()?.includes(value.toLowerCase()))
      : [...this.#sourceMovies];
  }

  #updateStateAfterLoad(): void {
    const { currentPage: page, searchValue: search } = this.#stateService.state;
    this.setMovieListParams({ page: page.toString(), search });
    this.#updateStateByLoading(false);
  }

  #convertDtoListToModel(list: MovieDto[]): MovieModel[] {
    return list.map((movie: MovieDto) => new MovieModel(movie));
  }

  #updateStateByLoading(loading: boolean): void {
    this.#stateService.setState({ ...this.#stateService.state, loading });
  }
}
