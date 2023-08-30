import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { KinopoiskDto } from '@appDTOs';
import { Environment } from '@appModels';
import { ENVIRONMENT } from '@appTokens';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KinopoiskApiService {
  #http = inject(HttpClient);
  #kpToken: string;

  #baseURL = 'https://api.kinopoisk.dev/v1.3/';

  constructor(@Inject(ENVIRONMENT) environment: Environment) {
    this.#kpToken = environment.kinopoiskToken;
  }

  getMovieById(id: number): Observable<KinopoiskDto> {
    return this.#http.get<KinopoiskDto>(this.#baseURL + `movie/${id}`, {
      headers: { 'X-API-KEY': this.#kpToken }
    });
  }
}
