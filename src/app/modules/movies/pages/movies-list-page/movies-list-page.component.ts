import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './movies-list-page.component.html',
  styleUrls: ['./movies-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListPageComponent {}
