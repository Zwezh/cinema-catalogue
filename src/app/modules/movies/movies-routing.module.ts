import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListPageComponent } from "./pages";

const routes: Routes = [
  {
    path: '',
    title: 'List',
    component: MoviesListPageComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {
}
