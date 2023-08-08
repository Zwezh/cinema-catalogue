import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadSpinnerComponent } from '@appComponents';
import { MovieModel } from '@appModels';

import { Observable } from 'rxjs';

import { urlsConstant } from '@appConstants';
import { TranslateModule } from '@ngx-translate/core';

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
    MovieDetailsFullContentComponent,
    TranslateModule,
    NgStyle
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie$: Observable<MovieModel>;
  loading$: Observable<boolean>;

  #actionService = inject(MovieDetailsActionService);
  #stateService = inject(MovieDetailsStateService);
  #activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.movie$ = this.#stateService.select(({ movie }) => movie);
    this.loading$ = this.#stateService.select(({ loading }) => loading);
  }

  get noPictureUrl(): string {
    return urlsConstant.NO_PICTURE_URL;
  }

  ngOnInit(): void {
    this.#actionService.loadMovieById(this.#activatedRoute.snapshot.params['id']);
  }

  ngOnDestroy(): void {
    this.#actionService.resetState();
  }
}
