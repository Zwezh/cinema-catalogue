import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadSpinnerComponent } from '@appComponents';
import { MovieModel } from '@appModels';

import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { MoviesListComponent } from './components';
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
    LoadSpinnerComponent,
    ActionsPanelComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesPageComponent implements OnInit {
  $movies: Signal<MovieModel[]>;
  $currentPage: Signal<number>;
  $pageSize: Signal<number>;
  $loading: Signal<boolean>;
  $indexFrom = computed(() => this.$currentPage() * this.$pageSize());
  $indexTo = computed(() => (this.$currentPage() + 1) * this.$pageSize());
  $collectionSize = computed(() => this.$movies().length);

  #router = inject(Router);
  #actionService = inject(MoviesEffects);
  #store = inject(MoviesStore);

  constructor() {
    this.$movies = this.#store.select(({ movies }) => movies);
    this.$currentPage = this.#store.select(({ currentPage }) => currentPage);
    this.$pageSize = this.#store.select(({ pageSize }) => pageSize);
    this.$loading = this.#store.select(({ loading }) => loading);
  }

  ngOnInit(): void {
    this.#actionService.loadAllMovies();
  }

  onChangePageChange(page: number): void {
    this.#navigateChange({ page: page.toString(), resetState: undefined });
  }

  #navigateChange(queryParams: MoviesPageParamsType): void {
    this.#router.navigate([], { queryParams, queryParamsHandling: 'merge' });
  }
}
