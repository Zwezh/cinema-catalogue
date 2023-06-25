export interface MovieDto {
  addedDate: string;
  ageRating: number;
  actors: string[];
  countries: string[];
  description: string;
  director: string;
  enName: string;
  extension: string;
  genres: string[];
  id: string;
  isSeries: true;
  kpid: number;
  logoUrl: string;
  name: string;
  movieLength: number;
  persons: string[];
  previewUrl: string;
  quality: string;
  rating: number;
  year: string;
  sequelsAndPrequels: string[];
  similarMovies: string[];
  size: number;
  seriesLength: number;
  totalSeriesLength: number;
}
