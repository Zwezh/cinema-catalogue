import { AsyncPipe, NgIf, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoadSpinnerComponent } from '@appComponents';
import { MovieModel } from '@appModels';

import { debounceTime, Observable, takeWhile } from 'rxjs';

import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { MoviesListComponent } from './components';
import { MoviesPageParams } from './models';

import { MoviesActionsService } from './services/movies-actions.service';
import { MoviesStateService } from './services/movies-state.service';

@Component({
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    MoviesListComponent,
    NgIf,
    NgbPagination,
    SlicePipe,
    ReactiveFormsModule,
    RouterLink,
    TranslateModule,
    LoadSpinnerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesPageComponent implements OnInit {
  movies$: Observable<MovieModel[]>;
  currentPage$: Observable<number>;
  pageSize$: Observable<number>;
  loading$: Observable<boolean>;
  searchControl = new FormControl();

  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  #actionService = inject(MoviesActionsService);
  #stateService = inject(MoviesStateService);
  #destroyRef = inject(DestroyRef);

  constructor() {
    this.movies$ = this.#stateService.select(({ movies }) => movies);
    this.currentPage$ = this.#stateService.select(({ currentPage }) => currentPage);
    this.pageSize$ = this.#stateService.select(({ pageSize }) => pageSize);
    this.loading$ = this.#stateService.select(({ loading }) => loading);
  }

  ngOnInit(): void {
    this.#actionService.loadAllMovies();
    this.searchControl.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.#destroyRef))
      .subscribe((value: string) => this.#navigateChange({ search: value || undefined, page: '1' }));
    this.#activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((params: MoviesPageParams) => {
        this.#actionService.setMovieListParams(params);
        this.searchControl.patchValue(params.search, { emitEvent: false });
      });
  }

  onChangePageChange(page: number): void {
    this.#navigateChange({ page: page.toString() });
  }

  #navigateChange(queryParams: MoviesPageParams): void {
    this.#router.navigate([], { queryParams, queryParamsHandling: 'merge' });
  }
}
