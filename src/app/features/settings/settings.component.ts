import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoadSpinnerComponent } from '@appComponents';
import { LanguagesConstant } from '@appConstants';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { SettingsForm } from './forms';
import { SettingsState } from './models';
import { SettingsEffects, SettingsStore } from './store';
import { getCachedGenresUtil } from './utils';

@Component({
  selector: 'cc-settings',
  standalone: true,
  imports: [TranslateModule, LoadSpinnerComponent, ReactiveFormsModule, KeyValuePipe, NgbTooltipModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  readonly $loading: Signal<boolean>;
  readonly $form: Signal<SettingsForm> = signal(null);
  readonly $genres: Signal<FormArray<FormControl<string>>> = signal(null);
  languages = LanguagesConstant;

  #settingsStore = inject(SettingsStore);
  #settingEffects = inject(SettingsEffects);

  constructor() {
    this.$loading = this.#settingsStore.select(({ loading }) => loading);
    this.$form = computed(() => {
      const settings = this.#settingsStore.select((state: SettingsState) => state.settings);
      return settings() ? new SettingsForm(settings()) : null;
    });
    this.$genres = computed(() => this.$form()?.controls?.genresForFilters);
  }

  onAddGenre(): void {
    this.$form().addGenre();
  }

  onFillFromMovieList(): void {
    const genres = getCachedGenresUtil();
    this.$form().controls.genresForFilters.clear();
    genres.filter(Boolean).forEach((genre: string) => this.$form().addGenre(genre));
    this.$form().markAsDirty();
  }

  onUpdateSettings(): void {
    this.#settingEffects.update(this.$form().value);
  }

  onRemoveGenreField(index: number): void {
    this.$form().removeGenreById(index);
  }
}
