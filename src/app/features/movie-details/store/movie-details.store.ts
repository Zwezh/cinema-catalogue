import { Injectable } from '@angular/core';
import { BaseStore } from '@appStore';

import { MOVIE_DETAILS_INITIAL_STATE } from '../constants';
import { MovieDetailsState } from '../types';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsStore extends BaseStore<MovieDetailsState> {
  constructor() {
    super(MOVIE_DETAILS_INITIAL_STATE);
  }
}
