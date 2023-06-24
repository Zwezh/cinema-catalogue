import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'cc-load-spinner',
  standalone: true,
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.scss'],
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadSpinnerComponent {
  @Input() loading: boolean;
}
