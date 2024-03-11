export interface MovieDto {
  addedDate: string;
  ageRating: number;
  backdropUrl: string;
  compactPosterUrl: string;
  countries: string[];
  description: string;
  director: string[];
  enName: string;
  extension: string;
  genres: string[];
  id: string;
  isSeries: boolean;
  kpId: number;
  posterUrl: string;
  name: string;
  movieLength: number;
  actors: string[];
  quality: string;
  rating: number;
  year: number | number[];
  sequelsAndPrequels: string[];
  similarMovies: string[];
}
