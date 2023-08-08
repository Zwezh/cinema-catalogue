import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieDto } from '@appDTOs';

import { filter, take, takeWhile } from 'rxjs';

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
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  #alive = true;

  onUpdateMovie(): void {
    this.actionsService
      .updateMovie$(this.form.getMovieValue())
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.#router.navigate(['..'], { relativeTo: this.#activatedRoute });
        }
      });
  }

  override loadInitialData(): void {
    super.loadInitialData();
    this.stateService
      .select(({ movieDTO }) => movieDTO)
      .pipe(
        takeWhile(() => this.#alive),
        filter(Boolean)
      )
      .subscribe((result: MovieDto) => {
        this.form.setValuesFromDB(result);
      });
    this.actionsService.loadDataDB(this.#activatedRoute.snapshot.paramMap.get('id'));
  }
}
