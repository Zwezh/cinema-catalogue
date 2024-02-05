import { AsyncPipe, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadSpinnerComponent } from '@appComponents';
import { MovieModel } from '@appModels';

import { Observable } from 'rxjs';

import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { MoviesListComponent } from './components';
import { MoviesPageParamsType } from './types';

import { MoviesActionsService } from './services/movies-actions.service';
import { MoviesStateService } from './services/movies-state.service';
import { ActionsPanelComponent } from '../actions-panel';

@Component({
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
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
  movies$: Observable<MovieModel[]>;
  currentPage$: Observable<number>;
  pageSize$: Observable<number>;
  loading$: Observable<boolean>;

  #router = inject(Router);
  #actionService = inject(MoviesActionsService);
  #stateService = inject(MoviesStateService);

  constructor() {
    this.movies$ = this.#stateService.select(({ movies }) => movies);
    this.currentPage$ = this.#stateService.select(({ currentPage }) => currentPage);
    this.pageSize$ = this.#stateService.select(({ pageSize }) => pageSize);
    this.loading$ = this.#stateService.select(({ loading }) => loading);
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
