import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KinopoiskDto } from '@appDTOs';

import { filter, takeWhile } from 'rxjs';

import { SettingsStateService } from '../../settings';
import { MovieUpsertForm } from '../forms';
import { MovieUpsertActionsService, MovieUpsertStateService } from '../services';

@Component({ template: '' })
export abstract class MovieUpsertPageBaseComponent implements OnInit, OnDestroy {
  form: MovieUpsertForm;
  protected actionsService = inject(MovieUpsertActionsService);
  protected stateService = inject(MovieUpsertStateService);
  protected settingsStateService = inject(SettingsStateService);
  protected destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.form = new MovieUpsertForm();
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.actionsService.resetState();
  }

  onLoadDataFromKP(): void {
    if (!this.form.value.kpId) {
      return;
    }
    this.actionsService.loadDataFromKP(this.form.value.kpId);
  }

  protected loadInitialData(): void {
    this.stateService
      .select(({ kinopoiskDTO }) => kinopoiskDTO)
      .pipe(takeUntilDestroyed(this.destroyRef), filter(Boolean))
      .subscribe((result: KinopoiskDto) => this.form.setValuesFromKinopoisk(result));
  }
}
