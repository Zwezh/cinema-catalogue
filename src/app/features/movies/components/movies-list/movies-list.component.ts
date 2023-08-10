import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TrackByFunction } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieModel } from '@appModels';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cc-movies-list',
  standalone: true,
  imports: [NgFor, RouterLink, TranslateModule],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListComponent {
  @Input() movies!: MovieModel[];

  trackByBookId: TrackByFunction<MovieModel> = (index, movie) => movie.id;
}
