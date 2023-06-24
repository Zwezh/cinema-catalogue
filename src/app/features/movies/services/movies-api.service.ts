import { inject, Injectable } from '@angular/core';
import { MovieRaw } from '@appModels';
import { FireApiService, MockApiService } from '@appServices';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService extends FireApiService {
  // #mockApi = inject(MockApiService);

  constructor() {
    super('movies');
  }

  getAllMovies(): Observable<MovieRaw[]> {
    return this.getAll<MovieRaw[]>();
  }
}
