import { Sorting } from '@appTypes';

import { FiltersValue } from '../../filters-panel';

export type ListActionsState = {
  readonly filters?: FiltersValue;
  readonly searchValue?: string;
  readonly sorting?: Sorting;
};
