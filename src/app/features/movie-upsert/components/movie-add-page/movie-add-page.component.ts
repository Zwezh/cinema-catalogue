import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { take } from 'rxjs';

import { TranslateModule } from '@ngx-translate/core';

import { MovieUpsertContentComponent } from '../movie-upsert-content';
import { MovieUpsertPageBaseComponent } from '../movie-upsert-page-base.component';

@Component({
  selector: 'cc-movie-add-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MovieUpsertContentComponent, TranslateModule],
  templateUrl: './movie-add-page.component.html',
  styleUrls: ['./movie-add-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieAddPageComponent extends MovieUpsertPageBaseComponent {
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);

  constructor() {
    super();
    this.#loadSettingData();
  }

  onAddMovie(): void {
    this.effects
      .addMovie$(this.form.getMovieValue())
      .pipe(take(1))
      .subscribe(() => {
        this.form.reset();
        this.#router.navigate(['..'], { relativeTo: this.#activatedRoute });
      });
  }

  onAddMovieAndContinue(): void {
    this.effects
      .addMovie$(this.form.getMovieValue())
      .pipe(take(1))
      .subscribe(() => this.form.reset());
  }
  #loadSettingData(): void {
    effect(() => {
      const settings = this.settingsStore.select(({ settings }) => settings);
      if (settings()) {
        this.form.setSettingsValues(settings());
      }
    });
  }
}
