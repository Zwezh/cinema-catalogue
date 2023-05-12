export interface MovieUpsertValueModel {
  [key: string]: unknown;
  kpId: number;
  name: string;
  enName: string;
  year: number;
  description: string;
  rating: number;
  movieLength: number;
  ageRating: number;
  logoUrl: string;
  posterUrl: string;
  previewUrl: string;
  genres: string;
  countries: string;
  actors: string[];
  similarMovies: string;
  sequelsAndPrequels: string;
  releaseYears: string;
  totalSeriesLength: number;
  seriesLength: number;
  isSeries: boolean;
}
