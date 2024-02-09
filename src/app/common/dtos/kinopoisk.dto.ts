export type KinopoiskDto = {
  ageRating: number;
  alternativeName: string;
  backdrop: {
    previewUrl: string;
    url: string;
  };
  countries: KinopoiskListItemDto[];
  description: string;
  genres: KinopoiskListItemDto[];
  id: number;
  isSeries: true;
  logo: { url: string };
  movieLength: number;
  name: string;
  persons: KinopoiskPersonListDto[];
  poster: {
    previewUrl: string;
    url: string;
    mini?: string;
  };
  rating: { kp: number };
  releaseYears: {
    end: number;
    start: number;
  }[];
  sequelsAndPrequels: KinopoiskListItemDto[];
  seriesLength: 20;
  similarMovies: KinopoiskListItemDto[];
  totalSeriesLength: 155;
  year: number;
};

export type KinopoiskListItemDto = {
  id: number;
  name: string;
};

export type KinopoiskPersonListDto = KinopoiskListItemDto & {
  description: string;
  enName: string;
  enProfession: string;
  photo: string;
  profession: string;
};

export type KinopoiskImageDto = {
  docs: KinoposikImageDocument[];
  total: number;
  limit: number;
  page: number;
  pages: number;
};
export type KinoposikImageDocument = {
  url?: string;
  createdAt?: string;
  height?: number;
  movieId?: number;
  previewUrl?: string;
  type?: string;
  updatedAt?: string;
  width?: number;
  id?: string;
};
