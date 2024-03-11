import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { KinopoiskDto, KinopoiskImageDto } from '@appDTOs';
import { ENVIRONMENT } from '@appTokens';
import { Environment } from '@appTypes';

import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KinopoiskApiService {
  #http = inject(HttpClient);
  #kpToken: string;

  #baseURL = 'https://api.kinopoisk.dev/v1.4/';

  constructor(@Inject(ENVIRONMENT) environment: Environment) {
    this.#kpToken = environment.kinopoiskToken;
  }

  getMovieById(id: number): Observable<KinopoiskDto> {
    return this.#http.get<KinopoiskDto>(this.#baseURL + `movie/${id}`, {
      headers: { 'X-API-KEY': this.#kpToken }
    });
  }

  getMinimizedCoverURLImage(movieId: number): Observable<string> {
    return this.#http
      .get<KinopoiskImageDto>(this.#baseURL + `image`, {
        headers: { 'X-API-KEY': this.#kpToken },
        params: {
          limit: '1',
          movieId: movieId.toString(),
          type: 'cover'
        }
      })
      .pipe(
        map(({ docs }) => docs[0]?.previewUrl || ''),
        catchError(() => '')
      );
  }
}
