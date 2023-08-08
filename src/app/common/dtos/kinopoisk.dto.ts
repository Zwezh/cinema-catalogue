export interface KinopoiskDto {
  id: number;
  name: string;
  alternativeName: string;
  year: number;
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
  persons: KinopoiskPersonListDto[];
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

export interface KinopoiskPersonListDto extends KinopoiskListItemDto {
  description: string;
  enName: string;
  enProfession: string;
  photo: string;
  profession: string;
}
