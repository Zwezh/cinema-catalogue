import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadSpinnerComponent } from '@appComponents';
import { MovieDto } from '@appDTOs';

import { Observable } from 'rxjs';

import { MovieDetailsFullContentComponent, MovieDetailsRawContentComponent } from './components';
import { MovieDetailsActionService, MovieDetailsStateService } from './services';

@Component({
  selector: 'cc-movie-details',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    LoadSpinnerComponent,
    AsyncPipe,
    MovieDetailsRawContentComponent,
    MovieDetailsFullContentComponent
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsComponent {
  movie$: Observable<MovieDto>;
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
