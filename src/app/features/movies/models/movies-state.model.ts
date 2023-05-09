import { MovieRaw } from '../../../common/models/movie-raw.model';

export interface MoviesState {
  readonly movies: MovieRaw[];
}
