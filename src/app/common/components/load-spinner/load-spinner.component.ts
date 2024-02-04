import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-load-spinner',
  standalone: true,
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadSpinnerComponent {}
