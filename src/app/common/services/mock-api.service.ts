import { Injectable } from '@angular/core';
import { MovieRaw } from '@appModels';

import { Observable, of } from 'rxjs';

import { RAW_MOVIES } from '../../../assets/mocks/rawMovies';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  #movies = RAW_MOVIES;

  delete(id: string): Observable<boolean> {
    const deleteId = this.#movies.findIndex((movie: MovieRaw) => movie.name === id);
    this.#movies = this.#movies.splice(deleteId, 1);
    return of(deleteId !== -1);
  }

  getAll(): Observable<unknown> {
    return of(this.#movies);
  }

  post(): Observable<unknown> {
    return of(null);
  }

  put(): Observable<unknown> {
    return of(null);
  }
}
