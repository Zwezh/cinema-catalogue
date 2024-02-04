import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './logo.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {}
