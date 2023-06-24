import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieRaw } from '@appModels';

@Component({
  selector: 'cc-movies-list-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movies-list-item.component.html',
  styleUrls: ['./movies-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListItemComponent {
  @Input() movie!: MovieRaw;
}
