import { SortingKey } from './sorting-key.type';

import { SortingDirectionConstant } from '../constants';

export type MoviesParams = {
  currentPage: number;
  direction: SortingDirectionConstant;
  key: SortingKey;
  pageSize: number;
  search?: string;
};
