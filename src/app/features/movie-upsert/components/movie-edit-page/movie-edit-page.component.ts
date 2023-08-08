import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { KinopoiskDto, MovieDto } from '@appDTOs';

import { filter, take, takeWhile } from 'rxjs';

import { TranslateModule } from '@ngx-translate/core';

import { MovieUpsertForm } from '../../forms';
import { MovieUpsertActionsService, MovieUpsertStateService } from '../../services';
import { MovieUpsertContentComponent } from '../movie-upsert-content';

@Component({
  selector: 'cc-movie-edit-page',
  standalone: true,
  imports: [CommonModule, MovieUpsertContentComponent, RouterModule, TranslateModule],
  templateUrl: './movie-edit-page.component.html',
  styleUrls: ['./movie-edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieEditPageComponent implements OnInit, OnDestroy {
  form = new MovieUpsertForm();
  #actionsService = inject(MovieUpsertActionsService);
  #stateService = inject(MovieUpsertStateService);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  #alive = true;

  ngOnInit(): void {
    this.#stateService
      .select(({ kinopoiskDTO }) => kinopoiskDTO)
      .pipe(
        takeWhile(() => this.#alive),
        filter(Boolean)
      )
      .subscribe((result: KinopoiskDto) => this.form.setValuesFromKinopoisk(result));
    this.#stateService
      .select(({ movieDTO }) => movieDTO)
      .pipe(
        takeWhile(() => this.#alive),
        filter(Boolean)
      )
      .subscribe((result: MovieDto) => {
        this.form.setValuesFromDB(result);
      });
    this.#actionsService.loadDataDB(this.#activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnDestroy(): void {
    this.#alive = false;
  }

  onUpdateDataFromKP(): void {
    if (!this.form.value.kpId) {
      return;
    }
    this.#actionsService.loadDataFromKP(this.form.value.kpId);
  }

  onUpdateMovie(): void {
    this.#actionsService
      .updateMovie(this.form.getMovieValue())
      .pipe(take(1))
      .subscribe({ next: () => this.#router.navigate(['..']) });
  }
}
