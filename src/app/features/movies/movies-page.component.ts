import { AsyncPipe, NgIf, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { debounceTime, Observable, takeWhile } from 'rxjs';

import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { MoviesListComponent } from './components';
import { MovieRaw } from './models';

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
    TranslateModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesPageComponent implements OnInit, OnDestroy {
  movies$: Observable<MovieRaw[]>;
  currentPage$: Observable<number>;
  pageSize$: Observable<number>;
  searchControl = new FormControl();

  #actionService = inject(MoviesActionsService);
  #stateService = inject(MoviesStateService);
  #alive = true;
  constructor() {
    this.movies$ = this.#stateService.select(({ movies }) => movies);
    this.currentPage$ = this.#stateService.select(({ currentPage }) => currentPage);
    this.pageSize$ = this.#stateService.select(({ pageSize }) => pageSize);
  }

  ngOnInit(): void {
    this.#actionService.loadAllMovies();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        takeWhile(() => this.#alive)
      )
      .subscribe((value: string) => this.#actionService.searchMovies(value));
  }

  ngOnDestroy(): void {
    this.#alive = false;
  }

  onChangePageChange(value: number): void {
    this.#actionService.pageChange(value);
  }
}
