import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-logo',
  standalone: true,
  templateUrl: './logo.component.svg',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {}
