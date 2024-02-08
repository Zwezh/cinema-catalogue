import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, OnDestroy, Input, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadSpinnerComponent } from '@appComponents';
import { urlsConstant } from '@appConstants';
import { MovieModel } from '@appModels';

import { take } from 'rxjs';

import { TranslateModule } from '@ngx-translate/core';

import { MovieDetailsFullContentComponent, MovieDetailsRawContentComponent } from './components';
import { MovieDetailsEffects, MovieDetailsStore } from './store';

@Component({
  selector: 'cc-movie-details',
  standalone: true,
  imports: [
    RouterLink,
    LoadSpinnerComponent,
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
  $movie: Signal<MovieModel>;
  $loading: Signal<boolean>;

  #effects = inject(MovieDetailsEffects);
  #store = inject(MovieDetailsStore);
  #router = inject(Router);

  constructor() {
    this.$movie = this.#store.select(({ movie }) => movie);
    this.$loading = this.#store.select(({ loading }) => loading);
  }

  get noPictureUrl(): string {
    return urlsConstant.NO_PICTURE_URL;
  }

  ngOnInit(): void {
    this.#effects.loadMovieById(this.id);
  }

  ngOnDestroy(): void {
    this.#effects.resetState();
  }

  onDeleteMovie(): void {
    this.#effects
      .deleteMovie$(this.id)
      .pipe(take(1))
      .subscribe(() => {
        this.#router.navigate(['..']);
      });
  }
}
