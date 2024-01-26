import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { BehaviorSubject, Observable, debounceTime, tap } from 'rxjs';

import { NgbAccordionDirective, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { FiltersPanelComponent, FiltersValueType } from '../filters-panel';
import { MoviesActionsService, MoviesPageParamsType } from '../movies';

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
    NgIf,
    AsyncPipe
  ],
  templateUrl: './actions-panel.component.html',
  styleUrls: ['./actions-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsPanelComponent implements OnInit, AfterViewInit {
  @ViewChild('accordion', { static: true }) accordion: NgbAccordionDirective;
  searchControl = new FormControl();
  active = false;
  filters$: Observable<Partial<FiltersValueType>>;

  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  #actionService = inject(MoviesActionsService);
  #destroyRef = inject(DestroyRef);
  #filters$ = new BehaviorSubject<Partial<FiltersValueType>>(undefined);

  constructor() {
    this.filters$ = this.#filters$.asObservable();
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.#destroyRef))
      .subscribe((value: string) => this.#navigateChange({ search: value || undefined, resetState: true, page: '1' }));
    this.#activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((params: MoviesPageParamsType) => {
        this.#actionService.setMovieListParams(params);
        this.searchControl.patchValue(params.search, { emitEvent: false });
        if (params.filters) {
          const filters = JSON.parse(decodeURIComponent(params.filters));
          this.#filters$.next(filters);
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
    const filters = encodeURIComponent(JSON.stringify(value)) || undefined;
    this.#navigateChange({ filters, resetState: true, page: '1' });
  }

  #navigateChange(queryParams: MoviesPageParamsType): void {
    this.#router.navigate([], { queryParams, queryParamsHandling: 'merge' });
  }
}
