import { AsyncPipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, OnDestroy, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadSpinnerComponent } from '@appComponents';
import { urlsConstant } from '@appConstants';
import { MovieModel } from '@appModels';

import { Observable, take } from 'rxjs';

import { TranslateModule } from '@ngx-translate/core';

import { MovieDetailsFullContentComponent, MovieDetailsRawContentComponent } from './components';
import { MovieDetailsActionService, MovieDetailsStateService } from './services';

@Component({
  selector: 'cc-movie-details',
  standalone: true,
  imports: [
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
  @Input() id?: string;
  movie$: Observable<MovieModel>;
  loading$: Observable<boolean>;

  #actionService = inject(MovieDetailsActionService);
  #stateService = inject(MovieDetailsStateService);
  #router = inject(Router);

  constructor() {
    this.movie$ = this.#stateService.select(({ movie }) => movie);
    this.loading$ = this.#stateService.select(({ loading }) => loading);
  }

  get noPictureUrl(): string {
    return urlsConstant.NO_PICTURE_URL;
  }

  ngOnInit(): void {
    this.#actionService.loadMovieById(this.id);
  }

  ngOnDestroy(): void {
    this.#actionService.resetState();
  }

  onDeleteMovie(): void {
    this.#actionService
      .deleteMovie$(this.id)
      .pipe(take(1))
      .subscribe(() => {
        this.#router.navigate(['..']);
      });
  }
}
