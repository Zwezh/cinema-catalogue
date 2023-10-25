import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieDto, SettingsDto } from '@appDTOs';

import { filter, forkJoin, take, takeWhile } from 'rxjs';

import { TranslateModule } from '@ngx-translate/core';

import { MovieUpsertContentComponent } from '../movie-upsert-content';
import { MovieUpsertPageBaseComponent } from '../movie-upsert-page-base.component';

@Component({
  selector: 'cc-movie-edit-page',
  standalone: true,
  imports: [CommonModule, MovieUpsertContentComponent, RouterModule, TranslateModule],
  templateUrl: './movie-edit-page.component.html',
  styleUrls: ['./movie-edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieEditPageComponent extends MovieUpsertPageBaseComponent {
  @Input() id?: string;

  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);

  onUpdateMovie(): void {
    this.actionsService
      .updateMovie$(this.form.getMovieValue())
      .pipe(take(1))
      .subscribe(() => {
        this.#router.navigate(['..'], { relativeTo: this.#activatedRoute });
      });
  }

  override loadInitialData(): void {
    super.loadInitialData();
    const dataFromDb = this.stateService.select(({ movieDTO }) => movieDTO);
    const settings = this.settingsStateService.select(({ settings }) => settings);

    forkJoin([dataFromDb, settings])
      .pipe(takeUntilDestroyed(this.destroyRef), filter(Boolean))
      .subscribe(([movie, settings]: [MovieDto, SettingsDto]) => this.form.setValuesFromDB(movie, settings));
    this.actionsService.loadDataDB(this.id);
  }
}
