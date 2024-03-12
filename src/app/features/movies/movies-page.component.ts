import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmptyContainerComponent } from '@appComponents';
import { MovieModel } from '@appModels';
import { ResizeService } from '@appServices';

import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { MoviesListComponent } from './components';
import { MOVIES_PAGE_SIZE } from './constants';
import { MoviesEffects, MoviesStore } from './store';
import { MoviesPageParamsType } from './types';

import { ActionsPanelComponent } from '../actions-panel';

@Component({
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
  standalone: true,
  imports: [
    MoviesListComponent,
    NgbPagination,
    SlicePipe,
    TranslateModule,
    RouterLink,
    ActionsPanelComponent,
    EmptyContainerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesPageComponent implements OnInit {
  movies: Signal<MovieModel[]>;
  currentPage: Signal<number>;
  loading: Signal<boolean>;
  totalCount: Signal<number>;
  maxPages: Signal<number>;
  pageSize = MOVIES_PAGE_SIZE;
  #size = inject(ResizeService).size;
  #router = inject(Router);
  #effects = inject(MoviesEffects);
  #store = inject(MoviesStore);
  #activatedRoute = inject(ActivatedRoute);
  #destroyRef = inject(DestroyRef);

  constructor() {
    this.movies = this.#store.select(({ movies }) => movies);
    this.currentPage = this.#store.select(({ currentPage }) => currentPage);
    this.totalCount = this.#store.select(({ totalCount }) => totalCount);
    this.loading = this.#store.select(({ loading }) => loading);
    this.maxPages = computed(() => this.#size() / 100);
  }

  ngOnInit(): void {
    this.#activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((params: MoviesPageParamsType) => this.#effects.loadAllMovies(params));
  }

  onChangePageChange(page: number): void {
    const queryParams: MoviesPageParamsType = { currentPage: page === 1 ? undefined : (page - 1).toString() };
    this.#router.navigate([], { queryParams, queryParamsHandling: 'merge' });
  }
}
