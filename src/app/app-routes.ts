import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'movies',
    title: 'Movies',
    children: [
      { path: '', loadComponent: () => import('./features/movies').then((m) => m.MoviesPageComponent) },
      { path: ':id', loadComponent: () => import('./features/movie-details').then((m) => m.MovieDetailsComponent) }
    ]
  },
  { path: '', redirectTo: 'movies', pathMatch: 'prefix' },
  { path: '*', redirectTo: 'movies' }
];
