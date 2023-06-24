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
  genres: KinopoiskListItemDto[];
  countries: KinopoiskListItemDto[];
  persons: KinopoiskListItemDto[];
  similarMovies: KinopoiskListItemDto[];
  sequelsAndPrequels: KinopoiskListItemDto[];
  releaseYears: {
    start: number;
    end: number;
  }[];
  totalSeriesLength: 155;
  seriesLength: 20;
  isSeries: true;
}

export interface KinopoiskListItemDto {
  id: number;
  name: string;
}
