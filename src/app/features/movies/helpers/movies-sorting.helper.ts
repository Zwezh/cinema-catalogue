import { MovieModel } from '@app/common/models';
import { SortingDirectionConstant, SortingKeyConstant, SortingType } from '@app/features/actions-panel';

export const moviesSortingHelper = (list: MovieModel[], sortItem: SortingType): MovieModel[] => {
  return list.length ? [...list.sort((a: MovieModel, b: MovieModel) => orderBy(a, b, sortItem))] : list;
};

const orderBy = (a: MovieModel, b: MovieModel, options: SortingType): number => {
  switch (options.key) {
    case SortingKeyConstant.enName:
    case SortingKeyConstant.name:
    case SortingKeyConstant.quality:
      return orderStringResult(a[options.key], b[options.key], options.direction);
    case SortingKeyConstant.addedDate:
      return orderDateResult(a[options.key], b[options.key], options.direction);
    case SortingKeyConstant.year:
    case SortingKeyConstant.ageRating:
    case SortingKeyConstant.rating:
      return orderNumericResult(+a[options.key], +b[options.key], options.direction);
    default:
      return 0;
  }
};

const orderDateResult = (a: string, b: string, type: SortingDirectionConstant): number => {
  return orderNumericResult(new Date(a).getTime(), new Date(b).getTime(), type);
};

const orderNumericResult = (a: number, b: number, type: SortingDirectionConstant): number => {
  return type !== SortingDirectionConstant.asc ? b - a : a - b;
};

const orderStringResult = (a: string, b: string, type: SortingDirectionConstant): number => {
  return type !== SortingDirectionConstant.asc ? b?.localeCompare(a) : a?.localeCompare(b);
};
