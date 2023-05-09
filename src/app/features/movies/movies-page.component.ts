import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { MoviesListComponent } from './components';
import { MovieRaw } from './models';

import { MoviesActionsService } from './services/movies-actions.service';
import { MoviesStateService } from './services/movies-state.service';

@Component({
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
  standalone: true,
  imports: [AsyncPipe, MoviesListComponent, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesPageComponent implements OnInit {
  movies$: Observable<MovieRaw[]>;

  #actionService = inject(MoviesActionsService);
  #stateService = inject(MoviesStateService);
  constructor() {
    this.movies$ = this.#stateService.select(({ movies }) => movies);
  }

  ngOnInit(): void {
    this.#actionService.loadAllMovies();
  }
}
