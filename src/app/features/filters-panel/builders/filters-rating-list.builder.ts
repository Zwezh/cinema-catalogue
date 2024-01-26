import { FILTERS_MAX_RATING } from '../constants';
import { FiltersListType } from '../types';

export const filtersRatingListBuilder = (): FiltersListType =>
  new Array(FILTERS_MAX_RATING + 1).fill(0).map((_, index: number) => ({ value: FILTERS_MAX_RATING - index }));
