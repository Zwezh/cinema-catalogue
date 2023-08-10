import { MoviesState } from '../models';

export const MOVIES_INITIAL_STATE: MoviesState = {
  currentPage: 1,
  loading: false,
  movies: [],
  pageSize: 30
};
