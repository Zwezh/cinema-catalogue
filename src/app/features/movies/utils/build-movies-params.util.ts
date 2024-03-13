import { Params } from '@angular/router';
import { SortingDirectionConstant } from '@appConstants';
import { MoviesParams } from '@appTypes';

import { MOVIES_PAGE_SIZE } from '../constants';

export const buildMoviesParamsUtil = ({
  actors,
  currentPage,
  direction,
  directors,
  fromYear,
  genres,
  key,
  rating,
  search,
  toYear
}: Params): MoviesParams => {
  const params: MoviesParams = {
    currentPage: +currentPage || 0,
    direction: direction || SortingDirectionConstant.desc,
    key: key || 'addedDate',
    pageSize: MOVIES_PAGE_SIZE
  };
  if (search) {
    params.search = search;
  }
  if (rating) {
    params.rating = rating;
  }
  if (fromYear) {
    params.fromYear = fromYear;
  }
  if (toYear) {
    params.toYear = toYear;
  }
  if (genres) {
    params.genres = genres;
  }
  if (actors) {
    params.actors = actors;
  }
  if (directors) {
    params.directors = directors;
  }
  return params;
};
