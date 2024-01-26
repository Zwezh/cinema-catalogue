import { FILTERS_FROM_YEAR, FILTERS_TO_YEAR } from '../constants';
import { FiltersListType } from '../types';

export const filtersYearListBuilder = ({
  from = FILTERS_FROM_YEAR,
  to = FILTERS_TO_YEAR
}: {
  from?: number;
  to?: number;
}): FiltersListType => new Array(to - from + 1).fill(0).map((_, index: number) => ({ value: to - index }));
