import { storageKeysConstant } from '@appConstants';
import { MovieDto } from '@appDTOs';

export const getCachedGenresUtil = (): string[] => {
  const movies = (JSON.parse(sessionStorage.getItem(storageKeysConstant.MOVIES)) as MovieDto[]) || [];
  return Array.from(new Set(movies.map((movie: MovieDto) => movie.genres).flat()));
};
