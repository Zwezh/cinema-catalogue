import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NgbRating, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cc-rating',
  standalone: true,
  imports: [CommonModule, NgbRating, NgbTooltip],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent {
  @Input() value: number;
}
