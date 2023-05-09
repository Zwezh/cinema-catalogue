import { inject, Injectable } from '@angular/core';
import { FireApiService, MockApiService } from '@appServices';

import { Observable } from 'rxjs';

import { MovieRaw } from '@appModels';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService extends FireApiService {
  #mockApi = inject(MockApiService);

  constructor() {
    super('movies');
  }

  getAllMovies(): Observable<MovieRaw[]> {
    return this.#mockApi.getAll(); // this.getAll<MovieRaw[]>();
  }
}
