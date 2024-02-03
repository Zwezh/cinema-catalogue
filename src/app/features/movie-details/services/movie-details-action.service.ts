import { inject, Injectable } from '@angular/core';
import { storageKeysConstant } from '@appConstants';
import { MovieDto } from '@appDTOs';
import { MovieModel } from '@appModels';
import { MoviesApiService } from '@appServices';

import { Observable, take, tap } from 'rxjs';

import { MovieDetailsStateService } from './movie-details-state.service';

import { MOVIE_DETAILS_INITIAL_STATE } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsActionService {
  #apiService = inject(MoviesApiService);
  #stateService = inject(MovieDetailsStateService);

  loadMovieById(id: string): void {
    this.#stateService.setState({ ...this.#stateService.state, loading: true });
    this.#apiService.getMovieById$(id).pipe(take(1)).subscribe(this.#updateStateAfterLoadMovie.bind(this));
  }

  resetState(): void {
    this.#stateService.setState(MOVIE_DETAILS_INITIAL_STATE);
  }

  deleteMovie$(id: string): Observable<unknown> {
    return this.#apiService.deleteMovie$(id).pipe(tap(() => sessionStorage.removeItem(storageKeysConstant.MOVIES)));
  }

  #updateStateAfterLoadMovie(movie: MovieDto): void {
    const newState = { ...this.#stateService.state, movie: new MovieModel(movie), loading: false };
    this.#stateService.setState(newState);
  }
}
