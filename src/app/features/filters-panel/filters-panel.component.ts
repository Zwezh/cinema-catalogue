import { ChangeDetectionStrategy, Component, effect, EventEmitter, input, Output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';

import { filtersRatingListBuilder, filtersYearListBuilder } from './builders';
import { FiltersForm } from './forms';
import { FiltersList, FiltersValue } from './types';

@Component({
  selector: 'cc-filters-panel',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersPanelComponent {
  @Output() changeFilters = new EventEmitter<FiltersValue>();
  filters = input.required<FiltersValue>();
  genres = input.required<{ value: string }[], string[]>({
    alias: 'genresForFilters',
    transform: (genres: string[]) => genres.map((genre) => ({ value: genre }))
  });
  form = new FiltersForm();

  ratingList = filtersRatingListBuilder();

  fromYearList = signal<FiltersList>(filtersYearListBuilder({}));
  toYearList = signal<FiltersList>(filtersYearListBuilder({}));

  constructor() {
    effect(
      () => {
        if (this.filters()) {
          this.onChangeFromYearField({ value: this.filters()?.fromYear });
          this.onChangeToYearField({ value: this.filters()?.toYear });
          this.filters && this.form.patchValue(this.filters());
        }
      },
      { allowSignalWrites: true }
    );
  }

  onApplyFilters(): void {
    this.changeFilters.emit(this.form.getRawValue());
  }

  onResetFilters(): void {
    this.form.reset();
    this.changeFilters.emit(this.form.getRawValue());
  }

  onChangeToYearField(change: { value?: number }): void {
    this.fromYearList.update(() => filtersYearListBuilder({ to: change?.value }));
  }

  onChangeFromYearField(change: { value?: number }): void {
    this.toYearList.update(() => filtersYearListBuilder({ from: change?.value }));
  }
}
