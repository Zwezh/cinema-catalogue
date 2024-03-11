import { Injectable } from '@angular/core';
import { MovieDto } from '@appDTOs';
import { FireApiService } from '@appServices';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireMoviesApiService extends FireApiService {
  constructor() {
    super('movies');
  }

  getAllMovies$(): Observable<MovieDto[]> {
    return this.getAll$<MovieDto>((ref) => ref.orderBy('addedDate', 'desc'));
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
  deleteMovie$(id: string): Observable<unknown> {
    return this.delete$({ id });
  }
}
