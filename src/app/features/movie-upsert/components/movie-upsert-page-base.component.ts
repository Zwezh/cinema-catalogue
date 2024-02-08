import { Component, effect, inject, OnDestroy } from '@angular/core';

import { SettingsStore } from '../../settings';
import { MovieUpsertForm } from '../forms';
import { MovieUpsertState } from '../models';
import { MovieUpsertEffects, MovieUpsertStore } from '../store';

@Component({ template: '' })
export abstract class MovieUpsertPageBaseComponent implements OnDestroy {
  form: MovieUpsertForm;
  protected effects = inject(MovieUpsertEffects);
  protected store = inject(MovieUpsertStore);
  protected settingsStore = inject(SettingsStore);

  constructor() {
    this.form = new MovieUpsertForm();
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.effects.resetState();
  }

  onLoadDataFromKP(): void {
    if (!this.form.value.kpId) {
      return;
    }
    this.effects.loadDataFromKP(this.form.value.kpId);
  }

  protected loadInitialData(): void {
    effect(() => {
      const kpData = this.store.select((state: MovieUpsertState) => state.kinopoiskDTO);
      if (kpData()) {
        this.form.setValuesFromKinopoisk(kpData());
      }
    });
  }
}
