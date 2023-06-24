import { MoviesState } from '../models';

export const MOVIES_INITIAL_STATE: MoviesState = {
  currentPage: 0,
  movies: [],
  pageSize: 30
};
