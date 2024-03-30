import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  Signal,
  ViewChild,
  effect,
  inject,
  afterNextRender,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Params, Router, RouterModule } from '@angular/router';
import { SortingDirectionConstant } from '@appConstants';
import { IsAuthenticatedDirective } from '@appDirectives';
import { Sorting, SortingKey } from '@appTypes';

import { debounceTime, distinctUntilChanged } from 'rxjs';

import { NgbAccordionDirective, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';

import { SortingKeysConstant } from './constants';
import { ListActionsEffects, ListActionsStore } from './store';

import { FiltersPanelComponent, FiltersValue } from '../filters-panel';
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
    FormsModule,
    IsAuthenticatedDirective
  ],
  templateUrl: './actions-panel.component.html',
  styleUrls: ['./actions-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsPanelComponent implements OnInit {
  @ViewChild('accordion', { static: true }) accordion: NgbAccordionDirective;
  searchControl = new FormControl();
  sortingList = SortingKeysConstant;
  sortingDirections = SortingDirectionConstant;
  active = signal(false);
  selectedSortItem: Signal<Sorting>;
  filters: Signal<FiltersValue>;
  genresForFilters = inject(SettingsStore).select(({ settings }) => settings?.genresForFilters || []);
  #router = inject(Router);
  #effects = inject(ListActionsEffects);
  #store = inject(ListActionsStore);
  #destroyRef = inject(DestroyRef);

  constructor() {
    this.selectedSortItem = this.#store.select(({ sorting }) => sorting);
    this.filters = this.#store.select(({ filters }) => filters);
    effect(() => {
      const searchValue = this.#store.select(({ searchValue }) => searchValue)();
      if (typeof searchValue === 'string') this.searchControl.setValue(searchValue);
    });
    afterNextRender(() => {
      this.active.set(!!this.filters());
      if (this.active()) {
        this.accordion.toggle('filters');
      }
    });
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntilDestroyed(this.#destroyRef))
      .subscribe((value: string) => {
        const queryParams: Params = { search: value || undefined, currentPage: undefined };
        this.#router.navigate([], { queryParams, queryParamsHandling: 'merge' });
      });
    this.#effects.initListActionsEffect();
  }

  onChangeFilters(value: FiltersValue): void {
    this.#router.navigate([], { queryParams: { currentPage: undefined, ...value }, queryParamsHandling: 'merge' });
  }

  onChangeSortingKey(key: SortingKey): void {
    this.#router.navigate([], { queryParams: { key }, queryParamsHandling: 'merge' });
  }

  onChangeSortingDirection(): void {
    const direction = this.#getSortingDirection();
    this.#router.navigate([], { queryParams: { direction }, queryParamsHandling: 'merge' });
  }

  #getSortingDirection(): SortingDirectionConstant {
    return this.selectedSortItem()?.direction === SortingDirectionConstant.desc
      ? SortingDirectionConstant.asc
      : SortingDirectionConstant.desc;
  }
}
