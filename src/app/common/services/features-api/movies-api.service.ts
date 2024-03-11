import { Injectable } from '@angular/core';
import { MovieDto } from '@appDTOs';

import { Observable } from 'rxjs';

import { BaseApiService } from './base-api.service';

@Injectable({ providedIn: 'root' })
export class MoviesApiService extends BaseApiService {
  constructor() {
    super('movies');
  }

  getAllMovies$(): Observable<MovieDto[]> {
    return this.httpClient.get<MovieDto[]>(this.url);
  }

  getMovieGenres$(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.url}/genres`);
  }

  getMovieById$(id: string): Observable<MovieDto> {
    return this.httpClient.get<MovieDto>(`${this.url}/${id}`);
  }

  updateMovie$(movie: MovieDto): Observable<MovieDto> {
    return this.httpClient.put<MovieDto>(this.url, movie);
  }

  addMovie$(dto: MovieDto): Observable<MovieDto> {
    return this.httpClient.post<MovieDto>(this.url, dto);
  }

  deleteMovie$(id: string): Observable<unknown> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}
