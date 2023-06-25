import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoadSpinnerComponent } from '@appComponents';
import { MovieRaw } from '@appModels';

import { TranslateModule } from '@ngx-translate/core';

import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'cc-movie-details-raw-content',
  standalone: true,
  templateUrl: './movie-details-raw-content.component.html',
  styleUrls: ['./movie-details-raw-content.component.scss'],
  imports: [TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsRawContentComponent {
  @Input() movie: MovieRaw;
}
