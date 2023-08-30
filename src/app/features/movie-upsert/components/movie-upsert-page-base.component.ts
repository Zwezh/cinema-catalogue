import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
  protected alive = true;
  constructor(settingsStateService: SettingsStateService) {
    const { extension, quality } = settingsStateService.state.settings;
    this.form = new MovieUpsertForm(extension, quality);
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.alive = false;
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
      .pipe(
        takeWhile(() => this.alive),
        filter(Boolean)
      )
      .subscribe((result: KinopoiskDto) => this.form.setValuesFromKinopoisk(result));
  }
}
