import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KinopoiskDto } from '@appDTOs';

import { filter, takeWhile } from 'rxjs';

import { TranslateModule } from '@ngx-translate/core';

import { MovieUpsertForm } from '../../forms';
import { MovieUpsertActionsService, MovieUpsertStateService } from '../../services';
import { MovieUpsertContentComponent } from '../movie-upsert-content';

@Component({
  selector: 'cc-movie-add-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MovieUpsertContentComponent, TranslateModule],
  templateUrl: './movie-add-page.component.html',
  styleUrls: ['./movie-add-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieAddPageComponent implements OnInit, OnDestroy {
  form = new MovieUpsertForm();
  #actionsService = inject(MovieUpsertActionsService);
  #stateService = inject(MovieUpsertStateService);
  #alive = true;

  ngOnInit(): void {
    this.#stateService
      .select(({ kinopoiskDTO }) => kinopoiskDTO)
      .pipe(
        takeWhile(() => this.#alive),
        filter(Boolean)
      )
      .subscribe((result: KinopoiskDto) => this.form.setValuesFromKinopoisk(result));
  }

  ngOnDestroy(): void {
    this.#alive = false;
  }

  onLoadDataFromKP(): void {
    if (!this.form.value.kpId) {
      return;
    }
    this.#actionsService.loadDataFromKP(this.form.value.kpId);
  }
}
