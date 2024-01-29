import { SortingDirectionConstant, SortingKeyConstant } from '@app/features/actions-panel';

import { MoviesState } from '../types';

export const MOVIES_INITIAL_STATE: MoviesState = {
  currentPage: 1,
  loading: false,
  movies: [],
  sorting: {
    direction: SortingDirectionConstant.desc,
    key: SortingKeyConstant.addedDate
  },
  pageSize: 30
};
