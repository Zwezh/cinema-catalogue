import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'Movies',
    loadChildren: () => import('./modules/movies').then(({ MoviesModule }) => MoviesModule)
  },
  {
    path: '*',
    redirectTo: 'movies'
  }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
