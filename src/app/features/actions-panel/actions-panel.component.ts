import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  Signal,
  ViewChild,
  effect,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { SortingDirectionConstant } from '@appConstants';
import { IsAuthenticatedDirective } from '@appDirectives';
import { Sorting, SortingKey } from '@appTypes';

import { debounceTime } from 'rxjs';

import { NgbAccordionDirective, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';

import { SortingKeysConstant } from './constants';
import { ListActionsEffects, ListActionsStore } from './store';

import { FiltersPanelComponent, FiltersValueType } from '../filters-panel';
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
export class ActionsPanelComponent implements OnInit, AfterViewInit {
  @ViewChild('accordion', { static: true }) accordion: NgbAccordionDirective;
  searchControl = new FormControl();
  active = false;

  sortingList = SortingKeysConstant;
  sortingDirections = SortingDirectionConstant;
  $selectedSortItem: Signal<Sorting>;
  $filters = signal<Partial<FiltersValueType>>(undefined);
  $genresForFilters = inject(SettingsStore).select(({ settings }) => settings?.genresForFilters || []);
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  #effects = inject(ListActionsEffects);
  #store = inject(ListActionsStore);
  #destroyRef = inject(DestroyRef);

  constructor() {
    this.$selectedSortItem = this.#store.select(({ sorting }) => sorting);
    effect(() => {
      this.searchControl.setValue(this.#store.select(({ searchValue }) => searchValue)());
    });
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), takeUntilDestroyed(this.#destroyRef))
      .subscribe((value: string) => {
        const queryParams: Params = { search: value || undefined, currentPage: undefined };
        this.#router.navigate([], { queryParams, queryParamsHandling: 'merge' });
      });
    this.active = !!this.#activatedRoute.snapshot.queryParams['filters'];
    this.#effects.initListActionsEffect();
  }
  ngAfterViewInit(): void {
    if (this.active) {
      this.accordion.toggle('filters');
    }
  }

  onChangeFilters(value: Partial<FiltersValueType>): void {
    const filters = value ? encodeURIComponent(JSON.stringify(value)) : undefined;
    // this.#navigateChange({ filters, currentPage: undefined });
  }

  onChangeSortingKey(key: SortingKey): void {
    this.#router.navigate([], { queryParams: { key }, queryParamsHandling: 'merge' });
  }

  onChangeSortingDirection(): void {
    const direction = this.#getSortingDirection();
    this.#router.navigate([], { queryParams: { direction }, queryParamsHandling: 'merge' });
  }

  #getSortingDirection(): SortingDirectionConstant {
    return this.$selectedSortItem()?.direction === SortingDirectionConstant.desc
      ? SortingDirectionConstant.asc
      : SortingDirectionConstant.desc;
  }
}
