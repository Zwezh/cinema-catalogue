export interface KinopoiskDto {
  id: number;
  name: string;
  enName: string;
  year: 2023;
  description: string;
  rating: { kp: number };
  movieLength: number;
  ageRating: number;
  logo: { url: string };
  poster: {
    url: string;
    previewUrl: string;
  };
  genres: { name: string }[];
  countries: { name: string }[];
  persons: { name: string }[];
  similarMovies: { id: number }[];
  sequelsAndPrequels: { id: number }[];
  releaseYears: {
    start: number;
    end: number;
  }[];
  totalSeriesLength: 155;
  seriesLength: 20;
  isSeries: true;
}
