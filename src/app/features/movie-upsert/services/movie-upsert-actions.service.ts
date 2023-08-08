import { inject, Injectable } from '@angular/core';
import { MovieDto } from '@app/common/dtos';
import { KinopoiskApiService, MoviesApiService } from '@appServices';

import { Observable, take } from 'rxjs';

import { MovieUpsertStateService } from './movie-upsert-state.service';

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
      .getMovieById(id)
      .pipe(take(1))
      .subscribe((result) => this.#stateService.setState({ ...this.#stateService.state, movieDTO: result }));
  }

  updateMovie(movie: MovieDto): Observable<void> {
    return this.#moviesApi.updateMovie(movie);
  }
}
