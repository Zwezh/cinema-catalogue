export interface MovieDto {
  addedDate: string;
  ageRating: number;
  countries: string[];
  description: string;
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
  rating: string;
  year: string;
  sequelsAndPrequels: string[];
  similarMovies: string[];
  size: number;
  seriesLength: number;
  totalSeriesLength: number;
}
