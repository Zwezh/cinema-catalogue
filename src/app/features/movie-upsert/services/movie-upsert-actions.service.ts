import { inject, Injectable } from '@angular/core';
import { MovieDto } from '@app/common/dtos';
import { KinopoiskApiService, MoviesApiService } from '@appServices';

import { Observable, take, tap } from 'rxjs';

import { MovieUpsertStateService } from './movie-upsert-state.service';

import { MOVIE_UPSERT_INITIAL_STATE } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class MovieUpsertActionsService {
  #kpApiService = inject(KinopoiskApiService);
  #moviesApi = inject(MoviesApiService);
  #stateService = inject(MovieUpsertStateService);

  loadDataFromKP(id: number): void {
    this.#kpApiService
      .getMovieById(id)
      .pipe(take(1))
      .subscribe((result) => this.#stateService.setState({ ...this.#stateService.state, kinopoiskDTO: result }));
  }

  loadDataDB(id: string): void {
    this.#moviesApi
      .getMovieById$(id)
      .pipe(take(1))
      .subscribe((result) => this.#stateService.setState({ ...this.#stateService.state, movieDTO: result }));
  }

  updateMovie$(movie: MovieDto): Observable<void> {
    return this.#moviesApi.updateMovie$(movie).pipe(tap(() => localStorage.clear()));
  }

  addMovie$(movie: MovieDto): Observable<unknown> {
    return this.#moviesApi.addMovie$(movie).pipe(tap(() => localStorage.clear()));
  }

  resetState(): void {
    this.#stateService.setState(MOVIE_UPSERT_INITIAL_STATE);
  }
}
