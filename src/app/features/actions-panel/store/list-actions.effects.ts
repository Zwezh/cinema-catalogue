import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { ListActionsStore } from './list-actions.store';

import { buildSortingUtil } from '../utils';

@Injectable({ providedIn: 'root' })
export class ListActionsEffects {
  #store = inject(ListActionsStore);
  #route = inject(ActivatedRoute);
  #destroyRef = inject(DestroyRef);

  initListActionsEffect(): void {
    this.#route.queryParams.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((params) => {
      const sorting = buildSortingUtil(params);
      this.#store.update((state) => ({ ...state, sorting, searchValue: params['search'] }));
    });
  }
}
