import { inject, Injectable } from '@angular/core';

import { take } from 'rxjs';

import { MovieUpsertStateService } from './movie-upsert-state.service';

import { KinopoiskApiService } from '../../../common/services/kinopoisk-api.service';

@Injectable({
  providedIn: 'root'
})
export class MovieUpsertActionsService {
  #kpApiService = inject(KinopoiskApiService);
  #stateService = inject(MovieUpsertStateService);

  loadDataFromKP(id: number): void {
    this.#kpApiService
      .getMovieById(id)
      .pipe(take(1))
      .subscribe((result) => this.#stateService.setState({ ...this.#stateService.state, kinopoiskDTO: result }));
  }
}
