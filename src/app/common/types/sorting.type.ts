import { SortingKey } from './sorting-key.type';

import { SortingDirectionConstant } from '../constants';

export type Sorting = {
  key: SortingKey;
  direction: SortingDirectionConstant;
};
