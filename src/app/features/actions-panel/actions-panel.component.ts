import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  Signal,
  ViewChild,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { debounceTime } from 'rxjs';

import { NgbAccordionDirective, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';

import { SortingDirectionConstant, SortingKeyConstant } from './constants';
import { SortingType } from './types';

import { FiltersPanelComponent, FiltersValueType } from '../filters-panel';
import { MoviesEffects, MoviesPageParamsType, MoviesStore } from '../movies';
import { SettingsStore } from '../settings';

@Component({
  selector: 'cc-actions-panel',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    FiltersPanelComponent,
    NgbAccordionModule,
    NgClass,
    NgSelectModule,
    FormsModule
  ],
  templateUrl: './actions-panel.component.html',
  styleUrls: ['./actions-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsPanelComponent implements OnInit, AfterViewInit {
  @ViewChild('accordion', { static: true }) accordion: NgbAccordionDirective;
  searchControl = new FormControl();
  active = false;

  sortingList = Object.values(SortingKeyConstant).map((key) => ({ value: key }));
  sortingDirections = SortingDirectionConstant;
  $selectedSortItem: Signal<SortingType>;
  $filters = signal<Partial<FiltersValueType>>(undefined);
  $genresForFilters = inject(SettingsStore).select(({ settings }) => settings?.genresForFilters || []);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  #effects = inject(MoviesEffects);
  #store = inject(MoviesStore);
  #destroyRef = inject(DestroyRef);

  constructor() {
    this.$selectedSortItem = this.#store.select(({ sorting }) => sorting);
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.#destroyRef))
      .subscribe((value: string) => this.#navigateChange({ search: value || undefined, resetState: true, page: '1' }));
    this.#activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((params: MoviesPageParamsType) => {
        this.#effects.setMovieListParams(params);
        this.searchControl.patchValue(params.search, { emitEvent: false });
        if (params.filters) {
          const filters = JSON.parse(decodeURIComponent(params.filters));
          this.$filters.set(filters);
        }
      });
    this.active = !!this.#activatedRoute.snapshot.queryParams['filters'];
  }
  ngAfterViewInit(): void {
    if (this.active) {
      this.accordion.toggle('filters');
    }
  }

  onChangeFilters(value: Partial<FiltersValueType>): void {
    const filters = value ? encodeURIComponent(JSON.stringify(value)) : undefined;
    this.#navigateChange({ filters, resetState: true, page: '1' });
  }

  onChangeSortingKey(value: SortingKeyConstant): void {
    this.#effects.changeSortingKey(value);
  }

  onChangeSortingDirection(): void {
    this.#effects.changeSortingDirection();
  }

  #navigateChange(queryParams: MoviesPageParamsType): void {
    this.#router.navigate([], { queryParams, queryParamsHandling: 'merge' });
  }
}
