import { inject, Injectable } from '@angular/core';
import { storageKeysConstant } from '@appConstants';
import { MovieDto } from '@appDTOs';
import { MovieModel } from '@appModels';
import { MoviesApiService } from '@appServices';

import { Observable, take, tap } from 'rxjs';

import { MovieDetailsStore } from './movie-details.store';

@Injectable({ providedIn: 'root' })
export class MovieDetailsEffects {
  #store = inject(MovieDetailsStore);
  #apiService = inject(MoviesApiService);

  constructor() {}

  loadMovieById(id: string): void {
    this.#store.update((state) => ({ ...state, loading: true }));
    this.#apiService.getMovieById$(id).pipe(take(1)).subscribe(this.#updateStateAfterLoadMovie.bind(this));
  }

  resetState(): void {
    this.#store.reset();
  }

  deleteMovie$(id: string): Observable<unknown> {
    return this.#apiService.deleteMovie$(id).pipe(tap(() => sessionStorage.removeItem(storageKeysConstant.MOVIES)));
  }

  #updateStateAfterLoadMovie(movie: MovieDto): void {
    this.#store.update((state) => ({ ...state, movie: new MovieModel(movie), loading: false }));
  }
}
