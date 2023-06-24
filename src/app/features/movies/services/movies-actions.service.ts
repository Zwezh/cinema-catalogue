import { inject, Injectable } from '@angular/core';

import { take, tap } from 'rxjs';

import { MoviesApiService } from './movies-api.service';
import { MoviesStateService } from './movies-state.service';

import { MovieRaw, MoviesState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MoviesActionsService {
  #apiService = inject(MoviesApiService);
  #stateService = inject(MoviesStateService);
  #sourceMovies: MovieRaw[];

  loadAllMovies(): void {
    this.#apiService
      .getAllMovies()
      .pipe(
        take(1),
        tap((movies) => (this.#sourceMovies = [...movies]))
      )
      .subscribe(this.#updateStateForLoadMovies.bind(this));
  }

  pageChange(value: number): void {
    this.#stateService.setState({ ...this.#stateService.state, currentPage: value - 1 });
  }

  searchMovies(value: string): void {
    const filteredMovies = this.#sourceMovies.filter((item: MovieRaw) => item.name.includes(value));
    this.#updateStateForLoadMovies(filteredMovies);
  }

  #updateStateForLoadMovies(movies: MovieRaw[]): void {
    const newState = { ...this.#stateService.state, currentPage: 0, movies, size: movies.length };
    this.#stateService.setState(newState);
  }
}
