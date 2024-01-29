import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SettingsDto } from '@appDTOs';

import { filter, take } from 'rxjs';

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
export class MovieAddPageComponent extends MovieUpsertPageBaseComponent implements OnInit {
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);

  override ngOnInit() {
    super.ngOnInit();
    this.#loadSettingData();
  }

  onAddMovie(): void {
    this.actionsService
      .addMovie$(this.form.getMovieValue())
      .pipe(take(1))
      .subscribe(() => {
        this.form.reset();
        this.#router.navigate(['..'], { relativeTo: this.#activatedRoute });
      });
  }

  onAddMovieAndContinue(): void {
    this.actionsService
      .addMovie$(this.form.getMovieValue())
      .pipe(take(1))
      .subscribe(() => this.form.reset());
  }
  #loadSettingData(): void {
    this.settingsStateService
      .select(({ settings }) => settings)
      .pipe(takeUntilDestroyed(this.destroyRef), filter(Boolean))
      .subscribe((settings: SettingsDto) => this.form.setSettingsValues(settings));
  }
}
