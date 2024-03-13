import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, OnDestroy, Input, Signal, effect } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationModalData } from '@appComponents';
import { urlsConstant } from '@appConstants';
import { IsAuthenticatedDirective } from '@appDirectives';
import { MovieModel } from '@appModels';

import { filter, switchMap, take } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MovieDetailsFullContentComponent, MovieDetailsRawContentComponent } from './components';
import { MovieDetailsEffects, MovieDetailsStore } from './store';

@Component({
  selector: 'cc-movie-details',
  standalone: true,
  imports: [
    RouterLink,
    MovieDetailsRawContentComponent,
    MovieDetailsFullContentComponent,
    TranslateModule,
    NgStyle,
    IsAuthenticatedDirective
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  @Input() id?: string;
  movie: Signal<MovieModel>;
  loading: Signal<boolean>;

  #effects = inject(MovieDetailsEffects);
  #store = inject(MovieDetailsStore);
  #router = inject(Router);
  #title = inject(Title);
  #modalService = inject(NgbModal);
  #translateService = inject(TranslateService);

  constructor() {
    this.movie = this.#store.select(({ movie }) => movie);
    this.loading = this.#store.select(({ loading }) => loading);
    effect(() => {
      const name = this.movie()?.name;
      this.#title.setTitle(name);
    });
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

  async onDeleteMovie(): Promise<void> {
    const confirmationModalComponent = await import('@appComponents').then(
      ({ ConfirmationModalComponent }) => ConfirmationModalComponent
    );
    const modal = this.#modalService.open(confirmationModalComponent);
    modal.componentInstance.data = {
      title: this.#translateService.instant('movie.deleteModal.title'),
      body: this.#translateService.instant('movie.deleteModal.body', { movieName: this.movie()?.name }),
      cancelButton: this.#translateService.instant('actions.cancel'),
      confirmButton: this.#translateService.instant('actions.confirm'),
      type: 'danger'
    } as ConfirmationModalData;

    modal.closed
      .pipe(
        take(1),
        filter(Boolean),
        switchMap(() => this.#effects.deleteMovie$(this.id).pipe(take(1)))
      )
      .subscribe(() => this.#router.navigate(['..']));
  }
}
