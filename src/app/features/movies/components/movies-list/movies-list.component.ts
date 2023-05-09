import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieRaw } from '@appModels';

@Component({
  selector: 'cc-movies-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListComponent {
  @Input() movies!: MovieRaw[];
}
