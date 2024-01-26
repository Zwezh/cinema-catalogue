import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { RatingComponent } from '../../../movie-details/components';
import { MovieUpsertForm } from '../../forms';
import { MovieUpsertValueModel } from '../../models';

@Component({
  selector: 'cc-movie-upsert-content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule, RatingComponent, NgOptimizedImage],
  templateUrl: './movie-upsert-content.component.html',
  styleUrls: ['./movie-upsert-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieUpsertContentComponent {
  @Input({ required: true }) form: MovieUpsertForm;
  @Input({ required: true }) formValues: MovieUpsertValueModel;
}
