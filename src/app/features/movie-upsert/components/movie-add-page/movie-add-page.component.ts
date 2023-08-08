import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  onAddMovie(): void {
    this.actionsService
      .addMovie$(this.form.getMovieValue())
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.info(res);
          // this.#router.navigate(['..'], { relativeTo: this.#activatedRoute });
        }
      });
  }
}
