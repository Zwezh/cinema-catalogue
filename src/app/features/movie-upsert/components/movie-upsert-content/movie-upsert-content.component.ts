import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MovieUpsertForm } from '../../forms';
import { MovieUpsertValue } from '../../types';

@Component({
  selector: 'cc-movie-upsert-content',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, TranslateModule, NgOptimizedImage],
  templateUrl: './movie-upsert-content.component.html',
  styleUrls: ['./movie-upsert-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieUpsertContentComponent {
  @Input({ required: true }) form: MovieUpsertForm;
  @Input({ required: true }) formValues: MovieUpsertValue;
  @Output() loadFromKP = new EventEmitter<void>();
}
