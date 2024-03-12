import { Params } from '@angular/router';
import { SortingDirectionConstant } from '@appConstants';
import { MoviesParams } from '@appTypes';

import { MOVIES_PAGE_SIZE } from '../constants';

export const buildMoviesParamsUtil = ({ currentPage, direction, key, search }: Params): MoviesParams => {
  const params = {
    currentPage: +currentPage || 0,
    direction: direction || SortingDirectionConstant.desc,
    key: key || 'addedDate',
    pageSize: MOVIES_PAGE_SIZE,
    search: search || undefined
  };
  if (!params.search) {
    delete params.search;
  }
  return params;
};
