import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieRaw } from '@appModels';

import { Observable } from 'rxjs';

import { LoadSpinnerComponent } from '@appComponents';

import { MovieDetailsActionService, MovieDetailsStateService } from './services';

import { RatingComponent } from './components/rating/rating.component';
import { MoviesListComponent } from '../movies/components';

@Component({
  selector: 'cc-movie-details',
  standalone: true,
  imports: [CommonModule, MoviesListComponent, RouterLink, RatingComponent, LoadSpinnerComponent],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsComponent {
  movie$: Observable<MovieRaw>;
  loading$: Observable<boolean>;

  #actionService = inject(MovieDetailsActionService);
  #stateService = inject(MovieDetailsStateService);
  #activatedRoute = inject(ActivatedRoute);
  #alive = true;
  constructor() {
    this.movie$ = this.#stateService.select(({ movie }) => movie);
    this.loading$ = this.#stateService.select(({ loading }) => loading);
  }
  ngOnInit(): void {
    this.#actionService.loadMovieById(this.#activatedRoute.snapshot.params['id']);
  }

  ngOnDestroy(): void {
    this.#alive = false;
  }
}
