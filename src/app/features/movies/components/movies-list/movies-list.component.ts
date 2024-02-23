import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmptyContainerComponent } from '@appComponents';
import { MovieModel } from '@appModels';

import { TranslateModule } from '@ngx-translate/core';

import { MovieListItemComponent } from '../movie-list-item';

@Component({
  selector: 'cc-movies-list',
  standalone: true,
  imports: [RouterLink, TranslateModule, MovieListItemComponent, EmptyContainerComponent, NgClass],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListComponent {
  @Input({ required: true }) movies!: MovieModel[];
}
