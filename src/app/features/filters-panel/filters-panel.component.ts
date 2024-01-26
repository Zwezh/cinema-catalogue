import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';

import { filtersRatingListBuilder, filtersYearListBuilder } from './builders';
import { FiltersForm } from './forms';
import { FiltersListType, FiltersValueType } from './types';

@Component({
  selector: 'cc-filters-panel',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, NgSelectModule, AsyncPipe],
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersPanelComponent implements OnInit {
  @Input({ required: true }) filters: Partial<FiltersValueType>;
  @Output() changeFilters = new EventEmitter<Partial<FiltersValueType>>();
  form = new FiltersForm();

  ratingList = filtersRatingListBuilder();

  fromYearList$ = new BehaviorSubject<FiltersListType>(filtersYearListBuilder({}));
  toYearList$ = new BehaviorSubject<FiltersListType>(filtersYearListBuilder({}));

  ngOnInit(): void {
    this.onChangeFromYearField({ value: this.filters?.fromYear });
    this.onChangeToYearField({ value: this.filters?.toYear });
    this.filters && this.form.patchValue(this.filters);
  }

  onApplyFilters(): void {
    this.changeFilters.emit(this.form.getValue());
  }

  onResetFilters(): void {
    this.form.reset();
    this.onApplyFilters();
  }

  onChangeToYearField(change: { value?: number }): void {
    this.fromYearList$.next(filtersYearListBuilder({ to: change?.value }));
  }

  onChangeFromYearField(change: { value?: number }): void {
    this.toYearList$.next(filtersYearListBuilder({ from: change?.value }));
  }
}
