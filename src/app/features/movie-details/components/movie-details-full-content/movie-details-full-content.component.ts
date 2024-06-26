import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { urlsConstant } from '@appConstants';
import { MovieModel } from '@appModels';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cc-movie-details-full-content',
  standalone: true,
  templateUrl: './movie-details-full-content.component.html',
  styleUrls: ['./movie-details-full-content.component.scss'],
  imports: [TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsFullContentComponent {
  @Input() movie: MovieModel;

  get pictureUrl(): string {
    return this.movie.posterUrl || urlsConstant.NO_PICTURE_URL;
  }
}
