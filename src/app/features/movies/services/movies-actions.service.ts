import { inject, Injectable } from '@angular/core';
import { LocalStorageKeysConstant } from '@appConstants';
import { MovieDto } from '@appDTOs';
import { MovieModel } from '@appModels';
import { MoviesApiService } from '@appServices';

import { map, take, tap } from 'rxjs';

import { MoviesStateService } from './movies-state.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesActionsService {
  #apiService = inject(MoviesApiService);
  #stateService = inject(MoviesStateService);
  #sourceMovies: MovieModel[];

  loadAllMovies(): void {
    const cachedMovies = localStorage.getItem(LocalStorageKeysConstant.MOVIES);
    if (cachedMovies) {
      const movieList = this.#convertDtoListToModel(JSON.parse(cachedMovies) as MovieDto[]);
      this.#updateStateForLoadMovies(movieList);
      this.#sourceMovies = [...movieList];
      return;
    }
    this.#apiService
      .getAllMovies$()
      .pipe(
        take(1),
        tap((movies: MovieDto[]) => localStorage.setItem(LocalStorageKeysConstant.MOVIES, JSON.stringify(movies))),
        map(this.#convertDtoListToModel),
        tap((movies: MovieModel[]) => (this.#sourceMovies = [...movies]))
      )
      .subscribe(this.#updateStateForLoadMovies.bind(this));
  }

  pageChange(value: number): void {
    this.#stateService.setState({ ...this.#stateService.state, currentPage: value - 1 });
  }

  searchMovies(value: string): void {
    const filteredMovies = this.#sourceMovies.filter((item: MovieModel) =>
      item?.name?.toLowerCase()?.includes(value.toLowerCase())
    );
    this.#updateStateForLoadMovies(filteredMovies);
  }

  #updateStateForLoadMovies(movies: MovieModel[]): void {
    const newState = { ...this.#stateService.state, currentPage: 0, movies, size: movies.length };
    this.#stateService.setState(newState);
  }

  #convertDtoListToModel(list: MovieDto[]): MovieModel[] {
    return list.map((movie: MovieDto) => new MovieModel(movie));
  }
}
