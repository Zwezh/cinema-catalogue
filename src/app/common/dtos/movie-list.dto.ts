import { MovieDto } from './movie.dto';

export type MovieListDto = {
  currentPage: number;
  list: MovieDto[];
  totalCount: number;
};
