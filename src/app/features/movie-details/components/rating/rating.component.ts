import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NgbRating, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cc-rating',
  standalone: true,
  imports: [NgbRating, NgbTooltip, TranslateModule],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent {
  @Input() value: number;
}
