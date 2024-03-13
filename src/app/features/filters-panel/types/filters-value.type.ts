export type FiltersValueType = {
  [key: string]: unknown;
  actors?: string;
  rating?: number;
  directors?: string;
  genres?: string[];
  fromYear?: number;
  toYear?: number;
};
