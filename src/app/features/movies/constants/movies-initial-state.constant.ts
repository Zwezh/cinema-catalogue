import { MoviesState } from '../types';

export const MOVIES_INITIAL_STATE: MoviesState = {
  currentPage: 0,
  loading: null,
  movies: [],
  totalCount: 0
};
