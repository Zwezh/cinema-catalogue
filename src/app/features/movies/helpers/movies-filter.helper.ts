import { FiltersValueType } from '@app/features/filters-panel';
import { MovieModel } from '@appModels';

export const moviesFilterHelper = (movie: MovieModel, filtersString: string): boolean => {
  //TODO A.Z.: Update after fix data in db.
  const filters = JSON.parse(decodeURIComponent(filtersString)) as Partial<FiltersValueType>;
  if (filters.rating && filters.rating > (movie?.rating ?? 0)) {
    return false;
  }
  if (filters.fromYear && filters.fromYear > +movie?.year) {
    return false;
  }
  if (filters.toYear && filters.toYear < +movie?.year) {
    return false;
  }
  if (filters?.genres?.length) {
    if (!filters.genres.every((genre: string) => movie?.genres?.includes(genre))) {
      return false;
    }
  }
  if (filters.actors) {
    const actors = filters.actors.split(',');
    if (!actors.every((actors: string) => movie?.actors?.some((actor: string) => actor.includes(actors)))) {
      return false;
    }
  }
  if (filters.directors) {
    const directors = filters.directors.split(',');
    if (!directors.every((director: string) => movie?.director?.includes(director))) {
      return false;
    }
  }
  return true;
};
