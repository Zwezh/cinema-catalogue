import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoadSpinnerComponent } from '@appComponents';
import { LanguagesConstant } from '@appConstants';

import { Observable, take, tap } from 'rxjs';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { SettingsForm } from './forms';
import { SettingsActionsService, SettingsStateService } from './services';

@Component({
  selector: 'cc-settings',
  standalone: true,
  imports: [
    TranslateModule,
    AsyncPipe,
    LoadSpinnerComponent,
    ReactiveFormsModule,
    KeyValuePipe,
    NgbTooltipModule
],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
  loading$: Observable<boolean>;
  form$: Observable<SettingsForm>;
  genres: FormArray<FormControl<string>>;
  languages = LanguagesConstant;

  #actionService = inject(SettingsActionsService);
  #stateService = inject(SettingsStateService);
  #form: SettingsForm;

  constructor() {
    this.loading$ = this.#stateService.select(({ loading }) => loading);
    this.form$ = this.#stateService
      .select(({ settings }) => new SettingsForm(settings))
      .pipe(
        tap((form) => (this.genres = form.controls.genresForFilters)),
        tap((form) => (this.#form = form))
      );
  }

  onAddGenre(): void {
    this.#form.addGenre();
  }

  onFillFromMovieList(): void {
    const genres = this.#actionService.getMovieGenresFromLocalStorage();
    this.#form.controls.genresForFilters.clear();
    genres.filter(Boolean).forEach((genre: string) => this.#form.addGenre(genre));
  }

  onUpdateSettings(): void {
    this.#actionService.updateSettings$(this.#form.value).pipe(take(1)).subscribe();
  }

  onRemoveGenreField(index: number): void {
    this.#form.removeGenreById(index);
  }
}
