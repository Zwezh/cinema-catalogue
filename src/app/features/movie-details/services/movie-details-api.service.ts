import { Injectable } from '@angular/core';
import { MovieDto } from '@appDTOs';
import { FireApiService } from '@appServices';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsApiService extends FireApiService {
  constructor() {
    super('movies');
  }

  getMovieById(id: string): Observable<MovieDto> {
    return this.getById<MovieDto>(id);
  }
}
