import { FilterCriteria } from './filter';

export type TQueryKey = {
  page: number;
  limit: number;
  filters?: FilterCriteria;
};
