import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MovieModel } from '@appModels';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cc-movie-details-raw-content',
  standalone: true,
  templateUrl: './movie-details-raw-content.component.html',
  styleUrls: ['./movie-details-raw-content.component.scss'],
  imports: [TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsRawContentComponent {
  @Input() movie: MovieModel;
}
