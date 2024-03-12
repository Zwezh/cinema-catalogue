import { Params } from '@angular/router';

import { SortingDirectionConstant } from '../../../common/constants';
import { Sorting } from '../../../common/types';

export const buildSortingUtil = ({ key, direction }: Params): Sorting => ({
  key: key || 'addedDate',
  direction: direction || SortingDirectionConstant.desc
});
