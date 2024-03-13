import { Sorting } from '@appTypes';

import { FiltersValueType } from '../../filters-panel';

export type ListActionsState = {
  readonly filters?: FiltersValueType;
  readonly searchValue?: string;
  readonly sorting?: Sorting;
};
