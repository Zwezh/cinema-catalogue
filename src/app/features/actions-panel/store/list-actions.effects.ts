import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params } from '@angular/router';

import { ListActionsStore } from './list-actions.store';

import { FiltersValue } from '../../filters-panel';
import { buildSortingUtil } from '../utils';

@Injectable({ providedIn: 'root' })
export class ListActionsEffects {
  #store = inject(ListActionsStore);
  #route = inject(ActivatedRoute);
  #destroyRef = inject(DestroyRef);

  initListActionsEffect(): void {
    this.#route.queryParams.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((params) => {
      const filters = this.#buildFilters(params);
      const sorting = buildSortingUtil(params);
      this.#store.update((state) => ({ ...state, sorting, searchValue: params['search'], filters }));
    });
  }

  #buildFilters(params: Params): FiltersValue {
    const filters: FiltersValue = {};
    if (params['actors']) {
      filters.actors = params['actors'];
    }
    if (params['rating']) {
      filters.rating = params['rating'];
    }
    if (params['directors']) {
      filters.directors = params['directors'];
    }
    if (params['genres']) {
      filters.genres = params['genres'];
    }
    if (params['fromYear']) {
      filters.fromYear = params['fromYear'];
    }
    if (params['toYear']) {
      filters.toYear = params['toYear'];
    }
    return Object.keys(filters).length === 0 ? undefined : filters;
  }
}
