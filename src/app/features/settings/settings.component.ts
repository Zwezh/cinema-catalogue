import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, Signal } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmptyContainerComponent } from '@appComponents';
import { LanguagesConstant } from '@appConstants';
import { IsAuthenticatedDirective } from '@appDirectives';
import { AuthService } from '@appServices';

import { take } from 'rxjs';

import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { SettingsForm } from './forms';
import { SettingsState } from './models';
import { SettingsEffects, SettingsStore } from './store';
import { getCachedGenresUtil } from './utils';

@Component({
  selector: 'cc-settings',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    KeyValuePipe,
    NgbTooltipModule,
    RouterLink,
    EmptyContainerComponent,
    IsAuthenticatedDirective
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  readonly $loading: Signal<boolean>;
  readonly $isAuthenticated: Signal<boolean>;
  readonly $form: Signal<SettingsForm> = signal(null);
  readonly $genres: Signal<FormArray<FormControl<string>>> = signal(null);
  languages = LanguagesConstant;

  #settingsStore = inject(SettingsStore);
  #settingEffects = inject(SettingsEffects);
  #authService = inject(AuthService);
  #modalService = inject(NgbModal);
  constructor() {
    this.$isAuthenticated = this.#authService.isLoggedIn;
    this.$loading = this.#settingsStore.select(({ loading }) => loading);
    this.$form = computed(() => {
      const settings = this.#settingsStore.select((state: SettingsState) => state.settings);
      return settings() ? new SettingsForm(settings()) : null;
    });
    this.$genres = computed(() => this.$form()?.controls?.genresForFilters);
    effect(() => {
      this.$form()?.disable(this.#authService.isLoggedIn());
    });
  }

  async onGetAccess(): Promise<void> {
    const authModalComponent = await import('../auth-modal').then(({ AuthModalComponent }) => AuthModalComponent);
    this.#modalService
      .open(authModalComponent)
      .closed.pipe(take(1))
      .subscribe((res) => this.#authService.authenticate(res));
  }

  onSignOutAccess(): void {
    this.#authService.signOut();
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
