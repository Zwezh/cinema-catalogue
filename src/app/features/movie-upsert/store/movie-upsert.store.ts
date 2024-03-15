import { Injectable } from '@angular/core';
import { BaseStore } from '@appStore';

import { MOVIE_UPSERT_INITIAL_STATE } from '../constants';
import { MovieUpsertState } from '../types';

@Injectable({
  providedIn: 'root'
})
export class MovieUpsertStore extends BaseStore<MovieUpsertState> {
  constructor() {
    super(MOVIE_UPSERT_INITIAL_STATE);
  }
}
