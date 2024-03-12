import { Sorting } from '@appTypes';

export type ListActionsState = {
  readonly searchValue?: string;
  readonly sorting?: Sorting;
};
