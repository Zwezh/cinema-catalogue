import { Injectable } from '@angular/core';
import { BaseStore } from '@appStore';

import { LIST_ACTIONS_INITIAL_STATE } from '../constants';
import { ListActionsState } from '../types';

@Injectable({ providedIn: 'root' })
export class ListActionsStore extends BaseStore<ListActionsState> {
  constructor() {
    super(LIST_ACTIONS_INITIAL_STATE);
  }
}
