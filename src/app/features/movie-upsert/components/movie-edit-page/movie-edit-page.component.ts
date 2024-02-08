import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { take } from 'rxjs';

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
export class MovieEditPageComponent extends MovieUpsertPageBaseComponent implements OnInit {
  @Input() id?: string;

  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.effects.loadDataDB(this.id);
  }

  onUpdateMovie(): void {
    this.effects
      .updateMovie$(this.form.getMovieValue())
      .pipe(take(1))
      .subscribe(() => {
        this.#router.navigate(['..'], { relativeTo: this.#activatedRoute });
      });
  }

  override loadInitialData(): void {
    super.loadInitialData();
    effect(() => {
      const movie = this.store.select(({ movieDTO }) => movieDTO);
      const settings = this.settingsStore.select(({ settings }) => settings);
      if (movie() && settings()) {
        this.form.setValuesFromDB(movie(), settings());
      }
    });
  }
}
