import { inject, Injectable } from '@angular/core';
import { MovieRaw } from '@appModels';

import { take } from 'rxjs';

import { MovieDetailsApiService } from './movie-details-api.service';
import { MovieDetailsStateService } from './movie-details-state.service';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsActionService {
  #apiService = inject(MovieDetailsApiService);
  #stateService = inject(MovieDetailsStateService);

  loadMovieById(id: string): void {
    this.#stateService.setState({ ...this.#stateService.state, loading: true });
    this.#apiService.getMovieById(id).pipe(take(1)).subscribe(this.#updateStateAfterLoadMovie.bind(this));
  }

  #updateStateAfterLoadMovie(movie: MovieRaw): void {
    const newState = { ...this.#stateService.state, movie, loading: false };
    this.#stateService.setState(newState);
  }
}
