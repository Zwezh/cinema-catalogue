import { Component, effect, inject, OnDestroy } from '@angular/core';

import { SettingsStore } from '../../settings';
import { MovieUpsertForm } from '../forms';
import { MovieUpsertEffects, MovieUpsertStore } from '../store';
import { MovieUpsertState } from '../types';

@Component({ template: '' })
export abstract class MovieUpsertPageBaseComponent implements OnDestroy {
  form: MovieUpsertForm;
  protected effects = inject(MovieUpsertEffects);
  protected store = inject(MovieUpsertStore);
  protected settingsStore = inject(SettingsStore);

  constructor() {
    this.form = new MovieUpsertForm();
    this.loadInitialData();
    effect(() => {
      if (this.store.state().loading) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });
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
        this.form.markAsDirty();
      }
    });
  }
}
