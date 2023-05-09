import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MovieRaw } from '@appModels';

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

  getAll(): Observable<any> {
    return of(this.#movies);
  }

  post(): Observable<any> {
    return of(null);
  }

  put(): Observable<any> {
    return of(null);
  }
}
