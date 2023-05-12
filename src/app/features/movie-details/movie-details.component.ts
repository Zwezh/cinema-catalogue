import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RatingComponent } from './components/rating/rating.component';
import { MoviesListComponent } from '../movies/components';

@Component({
  selector: 'cc-movie-details',
  standalone: true,
  imports: [CommonModule, MoviesListComponent, RouterLink, RatingComponent],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsComponent {}
