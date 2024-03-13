import { SortingKey } from './sorting-key.type';

import { SortingDirectionConstant } from '../constants';

export type MoviesParams = {
  currentPage: number;
  direction: SortingDirectionConstant;
  key: SortingKey;
  pageSize: number;
  actors?: string;
  directors?: string[];
  fromYear?: number;
  genres?: string[];
  rating?: number;
  search?: string;
  toYear?: number;
};
