import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'movies',
    title: 'navigation.movies',
    children: [
      { path: '', loadComponent: () => import('./features/movies').then((m) => m.MoviesPageComponent) },
      {
        path: 'add',
        loadComponent: () => import('./features/movie-upsert').then((m) => m.MovieAddPageComponent),
        pathMatch: 'full',
        title: 'addMovie'
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            loadComponent: () => import('./features/movie-details').then((m) => m.MovieDetailsComponent),
            title: 'navigation.movies'
          },
          {
            path: 'edit',
            loadComponent: () => import('./features/movie-upsert').then((m) => m.MovieEditPageComponent),
            title: 'updateMovie'
          }
        ]
      }
    ]
  },
  {
    path: 'settings',
    title: 'settings.title',
    loadComponent: () => import('./features/settings/settings.component').then((m) => m.SettingsComponent)
  },
  { path: '', redirectTo: 'movies', pathMatch: 'prefix' },
  { path: '*', redirectTo: 'movies' }
];
