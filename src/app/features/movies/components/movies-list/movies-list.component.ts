
import { ChangeDetectionStrategy, Component, Input, TrackByFunction } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieModel } from '@appModels';

import { TranslateModule } from '@ngx-translate/core';

import { MovieListItemComponent } from '../movie-list-item';

@Component({
  selector: 'cc-movies-list',
  standalone: true,
  imports: [RouterLink, TranslateModule, MovieListItemComponent],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListComponent {
  @Input() movies!: MovieModel[];
  trackByBookId: TrackByFunction<MovieModel> = (index, movie) => movie.id;
}
