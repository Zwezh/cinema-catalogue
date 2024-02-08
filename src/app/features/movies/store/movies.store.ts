import { Injectable } from '@angular/core';
import { BaseStore } from '@appStore';

import { MOVIES_INITIAL_STATE } from '../constants';
import { MoviesState } from '../types';

@Injectable({
  providedIn: 'root'
})
export class MoviesStore extends BaseStore<MoviesState> {
  constructor() {
    super(MOVIES_INITIAL_STATE);
  }
}
