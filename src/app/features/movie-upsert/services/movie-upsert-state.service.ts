import { Injectable } from '@angular/core';
import { BaseStateService } from '@appServices';

import { MOVIE_UPSERT_INITIAL_STATE } from '../constants';
import { MovieUpsertState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MovieUpsertStateService extends BaseStateService<MovieUpsertState> {
  constructor() {
    super(MOVIE_UPSERT_INITIAL_STATE);
  }
}
