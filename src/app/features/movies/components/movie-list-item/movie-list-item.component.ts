import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieModel } from '@appModels';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cc-movie-list-item',
  standalone: true,
  imports: [TranslateModule, RouterLink, DecimalPipe],
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListItemComponent {
  @Input({ required: true }) movie: MovieModel;
}
