import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListPageComponent } from './pages';

@NgModule({
  declarations: [MoviesListPageComponent],
  imports: [CommonModule, MoviesRoutingModule]
})
export class MoviesModule {}
