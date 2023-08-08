import { Injectable } from '@angular/core';
import { MovieDto } from '@appDTOs';
import { MovieRaw } from '@appModels';
import { FireApiService } from '@appServices';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService extends FireApiService {
  constructor() {
    super('movies');
  }

  getAllMovies$(): Observable<MovieRaw[]> {
    return this.getAll$<MovieRaw[]>();
  }

  getMovieById$(id: string): Observable<MovieDto> {
    return this.getById$<MovieDto>(id);
  }

  updateMovie$(movie: MovieDto): Observable<void> {
    return this.update$<MovieDto>(movie);
  }

  addMovie$(dto: MovieDto): Observable<unknown> {
    return this.add$<MovieDto>(dto);
  }
}
