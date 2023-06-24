import { Injectable } from '@angular/core';
import { BaseStateService } from '@appServices';

import { MOVIE_DETAILS_INITIAL_STATE } from '../constants';
import { MovieDetailsState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsStateService extends BaseStateService<MovieDetailsState> {
  constructor() {
    super(MOVIE_DETAILS_INITIAL_STATE);
  }
}
