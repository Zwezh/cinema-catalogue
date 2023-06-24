import { Injectable } from '@angular/core';
import { BaseStateService } from '@appServices';

import { MOVIES_INITIAL_STATE } from '../constants';
import { MoviesState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MoviesStateService extends BaseStateService<MoviesState> {
  constructor() {
    super(MOVIES_INITIAL_STATE);
  }
}
