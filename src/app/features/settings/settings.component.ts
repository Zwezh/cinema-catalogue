import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, Signal } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmptyContainerComponent } from '@appComponents';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { SettingsForm } from './forms';
import { SettingsEffects, SettingsStore } from './store';
import { SettingsState } from './types';

@Component({
  selector: 'cc-settings',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, KeyValuePipe, NgbTooltipModule, RouterLink, EmptyContainerComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  readonly $loading: Signal<boolean>;
  readonly $form: Signal<SettingsForm> = signal(null);
  readonly $genres: Signal<FormArray<FormControl<string>>> = signal(null);

  #settingsStore = inject(SettingsStore);
  #settingEffects = inject(SettingsEffects);
  constructor() {
    this.$loading = this.#settingsStore.select(({ loading }) => loading);
    this.$form = computed(() => {
      const settings = this.#settingsStore.select((state: SettingsState) => state.settings);
      return settings() ? new SettingsForm(settings()) : null;
    });
    this.$genres = computed(() => this.$form()?.controls?.genresForFilters);
    effect(() => {
      const genres = this.#settingsStore.select((state: SettingsState) => state.movieGenres);
      if (genres().length) {
        this.$form().controls.genresForFilters.clear();
        genres()
          .filter(Boolean)
          .forEach((genre: string) => this.$form().addGenre(genre));
        this.$form().markAsDirty();
      }
    });
  }

  onAddGenre(): void {
    this.$form().addGenre();
  }

  onFillFromMovieList(): void {
    this.#settingEffects.loadGenres();
  }

  onUpdateSettings(): void {
    this.#settingEffects.update(this.$form().value);
  }

  onRemoveGenreField(index: number): void {
    this.$form().removeGenreById(index);
  }
}
