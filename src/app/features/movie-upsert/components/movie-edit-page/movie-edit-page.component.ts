import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-movie-edit-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-edit-page.component.html',
  styleUrls: ['./movie-edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieEditPageComponent {}
