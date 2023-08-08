import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MovieModel } from '@appModels';

import { urlsConstant } from '@appConstants';
import { TranslateModule } from '@ngx-translate/core';

import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'cc-movie-details-full-content',
  standalone: true,
  templateUrl: './movie-details-full-content.component.html',
  styleUrls: ['./movie-details-full-content.component.scss'],
  imports: [RatingComponent, TranslateModule, NgForOf, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsFullContentComponent {
  @Input() movie: MovieModel;

  get pictureUrl(): string {
    return this.movie.posterUrl || urlsConstant.NO_PICTURE_URL;
  }
}
