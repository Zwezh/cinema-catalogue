import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MovieUpsertForm } from '../../forms';

@Component({
  selector: 'cc-movie-upsert-content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule],
  templateUrl: './movie-upsert-content.component.html',
  styleUrls: ['./movie-upsert-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieUpsertContentComponent {
  @Input() form: MovieUpsertForm;
}
