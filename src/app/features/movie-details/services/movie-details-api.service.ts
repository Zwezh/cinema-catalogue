import { inject, Injectable } from '@angular/core';
import { MovieRaw } from '@appModels';
import { FireApiService, MockApiService } from '@appServices';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsApiService extends FireApiService {
  constructor() {
    super('movies');
  }

  getMovieById(id: string): Observable<MovieRaw> {
    return this.getById<MovieRaw>(id);
  }
}
