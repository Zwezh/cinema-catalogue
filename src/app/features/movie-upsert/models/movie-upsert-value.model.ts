export interface MovieUpsertValueModel {
  [key: string]: unknown;
  actors: string;
  addedDate: string;
  ageRating: number;
  countries: string;
  description: string;
  director: string;
  enName: string;
  extension: string;
  genres: string;
  id: string;
  isSeries: boolean;
  kpId: number;
  movieLength: number;
  name: string;
  posterUrl: string;
  quality: string;
  rating: number;
  year: string;
  sequelsAndPrequels: string;
  similarMovies: string;
}
